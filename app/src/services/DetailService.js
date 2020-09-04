import ApiClient from "@/services/ApiClient.js";

export default {
  getList() {
    return ApiClient
      .get("wp/v2/tournament-details")
      .then(response => response.data);
  }
};
