import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // --- Customer Information ---
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String, 
    required: true, 
    default: 'US +1' 
  }, // Based on your UI dropdown
  
  // --- Preferences ---
  shippingOption: { 
    type: String, 
    required: true,
    enum: ['Standard', 'Express', 'Economy', 'Air Freight'] 
  },
  companyName: { 
    type: String 
  }, // Optional

  // --- Ship To Address ---
  address: {
    street: { type: String, required: true },
    streetLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const User = mongoose.model('User', userSchema);