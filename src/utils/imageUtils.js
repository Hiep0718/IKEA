import images from "../data/images.json"

// Helper function to get image path
export const getImage = (path) => {
  // Split the path by dots to navigate the nested object
  const keys = path.split(".")
  let result = images

  // Navigate through the object using the keys
  for (const key of keys) {
    if (result && result[key]) {
      result = result[key]
    } else {
      // If path doesn't exist, return a placeholder
      console.warn(`Image path "${path}" not found in images.json`)
      return images.placeholders.product
    }
  }

  return result
}

// Function to get a product image or fallback to placeholder
export const getProductImage = (productKey) => {
  try {
    return images.products[productKey] || images.placeholders.product
  } catch (error) {
    console.error(`Error fetching banner image: ${error.message}`)
    return images.placeholders.product
  }
}

// Function to get a category image or fallback to placeholder
export const getCategoryImage = (categoryKey) => {
  try {
    return images.categories[categoryKey] || images.placeholders.category
  } catch (error) {
    console.error(`Error fetching banner image: ${error.message}`)
    return images.placeholders.category
  }
}

// Function to get a room image or fallback to placeholder
export const getRoomImage = (roomKey) => {
  try {
    return images.rooms[roomKey] || images.placeholders.room
  } catch (error) {
    console.error(`Error fetching banner image: ${error.message}`)
    return images.placeholders.room
  }
}

// Function to get a banner image or fallback to placeholder
export const getBannerImage = (bannerKey) => {
  try {
    return images.banners[bannerKey] || images.placeholders.banner
  } catch (error) {
    console.error(`Error fetching banner image: ${error.message}`)
    return images.placeholders.banner
  }
}
