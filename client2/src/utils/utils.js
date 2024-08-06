export function createQueryParams(defaultLimit, page, filters) {
    const queryParams = new URLSearchParams();

    queryParams.append("limit", defaultLimit);
    queryParams.append("page", page);

    Object.keys(filters).forEach(key => {
        if (filters[key] === "Cheapest" || filters[key] === "Expensive") {
            queryParams.append(key, filters[key] === "Cheapest" ? "asc" : "desc");
            queryParams.append("sortBy", "price");
        } else if (filters[key]) {
            queryParams.append(key, filters[key]);
        }
    });

    return queryParams;
}