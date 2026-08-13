const API_URL =
  "https://tinyroomfinder.com/backend/public/api/listings";

/**
 * Get listings from TinyRoomFinder API
 */
export const getListings = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();

    // Pagination
    if (params.page) {
      queryParams.append("page", params.page);
    }

    if (params.per_page) {
      queryParams.append("per_page", params.per_page);
    }

    // Location
    if (params.location) {
      queryParams.append("location", params.location);
    }

    // Rent
    if (params.minRent !== undefined && params.minRent !== "") {
      queryParams.append("minRent", params.minRent);
    }

    if (params.maxRent !== undefined && params.maxRent !== "") {
      queryParams.append("maxRent", params.maxRent);
    }

    // Space type
    if (params.spaceType) {
      queryParams.append("spaceType", params.spaceType);
    }

    // Utilities
    if (
      params.utilitiesIncluded !== undefined &&
      params.utilitiesIncluded !== ""
    ) {
      queryParams.append(
        "utilitiesIncluded",
        params.utilitiesIncluded
      );
    }

    // Move-in date
    if (params.moveInDate) {
      queryParams.append(
        "moveInDate",
        params.moveInDate
      );
    }

    // Search
    if (params.search) {
      queryParams.append("search", params.search);
    }

    // Sorting
    if (params.sort) {
      queryParams.append("sort", params.sort);
    }

    if (params.order) {
      queryParams.append("order", params.order);
    }

    const url =
      queryParams.toString().length > 0
        ? `${API_URL}?${queryParams.toString()}`
        : API_URL;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    if (!data.status) {
      throw new Error(
        data.message || "Unable to fetch listings."
      );
    }

    return data;
  } catch (error) {
    console.error("Listings API Error:", error);

    throw error;
  }
};