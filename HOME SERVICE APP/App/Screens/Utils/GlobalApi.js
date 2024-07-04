import axios from 'axios';

const MASTER_URL = "https://api-ap-south-1.hygraph.com/v2/clw81rv4v01vz08w7yer4hyj0/master";

const getSlider = async () => {
  const query = `
    query GetSliders {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `;
  
  try {
    const response = await axios.post(MASTER_URL, { query });
    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      throw new Error('Failed to fetch sliders');
    }
    return response.data.data;  // Access the actual data returned by GraphQL
  } catch (error) {
    console.error('Error fetching sliders:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getCategories = async () => {
  const query = `
  query GetCategory { 
    categories {
      id
      name
      icon {
        url
      }
    }
  }  
  `;
  
  try {
    const response = await axios.post(MASTER_URL, { query });
    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      throw new Error('Failed to fetch sliders');
    }
    return response.data.data;  // Access the actual data returned by GraphQL
  } catch (error) {
    console.error('Error fetching sliders:', error.response ? error.response.data : error.message);
    throw error;
  }
};


const getBusinessList=async()=>{
  const query = `
  query GetBusinessList {
    businessLists {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
  
  `;
  
  try {
    const response = await axios.post(MASTER_URL, { query });
    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      throw new Error('Failed to fetch sliders');
    }
    return response.data.data;  // Access the actual data returned by GraphQL
  } catch (error) {
    console.error('Error fetching sliders:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getBusinessListByCategory=async(category)=>{
        const query=`
        query GetBusinessList {
          businessLists(where: {category: {name: "`+category+`"}}) {
            id
            name
            email
            contactPerson
            category {
              name
            }
            address
            about
            images {
              url
            }
          }
        }
        `;
        try {
          const response = await axios.post(MASTER_URL, { query });
          if (response.data.errors) {
            console.error('GraphQL errors:', response.data.errors);
            throw new Error('Failed to fetch sliders');
          }
          return response.data.data;  // Access the actual data returned by GraphQL
        } catch (error) {
          console.error('Error fetching sliders:', error.response ? error.response.data : error.message);
          throw error;
        }
}

const createBooking = async (data) => {
  // console.log("Creating booking with data:", data); // Log the data for debugging

  const query = `
  mutation createBooking {
    createBooking(
      data: {bookingStatus: Booked,
         businessList: {connect: {id: "`+data.businessId+`"}},
          date: "`+data.date+`", time: "`+data.time+`",
           userEmail: "`+data.userEmail+`", userName: "`+data.userName+`"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
    
  `;

  try {
    const response = await axios.post(MASTER_URL, { query });
    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      response.data.errors.forEach(error => {
        console.error(error.message);
      });
      throw new Error('Failed to create booking due to GraphQL errors');
    }
    console.log("Booking created successfully:", response.data.data);
    return response.data.data;  // Access the actual data returned by GraphQL
  } catch (error) {
    console.error('Error creating booking:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getUserBookings=async(userEmail)=>{
  const query=`
  query GetUserBookings {
    bookings(orderBy: updatedAt_DESC, where: {userEmail: "`+userEmail+`"}) {
      time
      userEmail
      userName
      bookingStatus
      date
      id
      businessList {
        id
        images {
          url
        }
        name
        address
        contactPerson
        email
        about
      }
    }
  }  
  `;
  try {
    const response = await axios.post(MASTER_URL, { query });
    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      throw new Error('Failed to fetch sliders');
    }
    return response.data.data;  // Access the actual data returned by GraphQL
  } catch (error) {
    console.error('Error fetching sliders:', error.response ? error.response.data : error.message);
    throw error;
  }
}
   
export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBookings
};
