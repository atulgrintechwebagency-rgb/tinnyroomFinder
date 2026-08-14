const SINGLE_LISTING_API_URL =
  "https://tinyroomfinder.com/backend/public/api/listing";

/**
 * Get single listing by slug
 */
export const getListingBySlug = async (slug) => {
  try {
    if (!slug) {
      throw new Error("Listing slug is required.");
    }

    const url =
      `${SINGLE_LISTING_API_URL}/${encodeURIComponent(slug)}`;

    console.log("Single Listing API URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    console.log(
      "Single Listing HTTP Status:",
      response.status
    );

    if (!response.ok) {
      throw new Error(
        `Single listing API request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    console.log(
      "Single Listing Raw API Response:",
      data
    );

    if (!data.status) {
      throw new Error(
        data.message ||
          "Unable to fetch listing."
      );
    }

    return data;

  } catch (error) {
    console.error(
      "Single Listing API Error:",
      error
    );

    throw error;
  }
};