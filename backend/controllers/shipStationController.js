import axios from 'axios';
import { asyncHandler } from '../utils/asyncHandler.js';

// Helper to generate Basic Auth Header
const getAuthHeader = () => {
  const apiKey = process.env.SHIPSTATION_API_KEY;
  const apiSecret = process.env.SHIPSTATION_API_SECRET;
  const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  return `Basic ${authString}`;
};

// Helper to clean phone numbers for comparison
const cleanPhone = (phone) => {
  return phone ? phone.replace(/\D/g, '') : '';
};

// Hardcoded Warehouse Origin (Where you ship FROM)
const WAREHOUSE_ORIGIN = {
  postalCode: "90210", // Example: Beverly Hills, CA (Change to your actual warehouse zip)
  countryCode: "US"
};

// @desc    Get Customer from ShipStation (Fetch All & Filter)
// @route   GET /api/shipstation/customer
// @access  Public
const getCustomer = asyncHandler(async (req, res) => {
  const { email, phone } = req.query;

  if (!email && !phone) {
    res.status(400);
    throw new Error('Please provide an email or phone number to search.');
  }

  try {
    const config = {
      headers: {
        Authorization: getAuthHeader(),
        'Content-Type': 'application/json'
      }
    };

    // Fetch recent 500 customers
    const response = await axios.get(
      `https://ssapi.shipstation.com/customers?pageSize=500&sortBy=ModifyDate&sortDir=DESC`, 
      config
    );

    const customers = response.data.customers;

    // Filter in memory
    const foundCustomer = customers.find(customer => {
      const emailMatch = email && customer.email && customer.email.toLowerCase() === email.toLowerCase();
      
      let phoneMatch = false;
      if (!emailMatch && phone && customer.phone) {
         phoneMatch = cleanPhone(customer.phone) === cleanPhone(phone);
      }

      return emailMatch || phoneMatch;
    });

    if (foundCustomer) {
      res.json(foundCustomer);
    } else {
      res.status(404);
      throw new Error('Customer not found in the recent records');
    }

  } catch (error) {
    console.error('ShipStation Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500);
    throw new Error(error.response?.data?.ExceptionMessage || 'Failed to fetch customer');
  }
});

// @desc    Get Shipping Rates from Multiple Carriers
// @route   POST /api/shipstation/rates
// @access  Public
const getRates = asyncHandler(async (req, res) => {
  const { toAddress, packageInfo } = req.body;

  if (!toAddress || !packageInfo) {
    res.status(400);
    throw new Error('Missing address or package details');
  }

  // List of carriers to check (Must be enabled in your ShipStation account)
  // Common codes: 'ups', 'fedex', 'stamps_com' (USPS), 'dhl_express'
  const carriersToCheck = ['ups', 'fedex', 'stamps_com']; 

  try {
    // Helper to fetch rates for a SINGLE carrier
    const fetchCarrierRate = async (carrierCode) => {
      try {
        const payload = {
          carrierCode: carrierCode,
          fromPostalCode: WAREHOUSE_ORIGIN.postalCode,
          toCountry: toAddress.country,
          toPostalCode: toAddress.zip,
          toCity: toAddress.city,
          toState: toAddress.state,
          weight: {
            value: parseFloat(packageInfo.weight),
            units: "pounds"
          },
          dimensions: {
            units: "inches",
            length: parseFloat(packageInfo.length),
            width: parseFloat(packageInfo.width),
            height: parseFloat(packageInfo.height)
          },
          confirmation: "delivery",
          residential: true
        };

        const config = {
          headers: {
            Authorization: getAuthHeader(),
            'Content-Type': 'application/json'
          }
        };

        const { data } = await axios.post(
          'https://ssapi.shipstation.com/shipments/getrates', 
          payload, 
          config
        );
        
        return data; // Returns array of services for this carrier
      } catch (err) {
        // Log error but don't fail the whole request
        console.error(`Failed to fetch ${carrierCode}:`, err.response?.data?.ExceptionMessage || err.message);
        return [];
      }
    };

    // Run all requests in parallel
    const results = await Promise.all(carriersToCheck.map(code => fetchCarrierRate(code)));

    // Flatten results and sort by price
    const allRates = results.flat();
    const sortedRates = allRates.sort((a, b) => a.shipmentCost - b.shipmentCost);

    res.json(sortedRates);

  } catch (error) {
    console.error('Rate Error:', error);
    res.status(500);
    throw new Error('Failed to calculate rates');
  }
});

export { getCustomer, getRates };