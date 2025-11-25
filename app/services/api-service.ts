// Types for API query parameters
export interface ApiQueryParams {
	page?: number;
	limit?: number;
	query?: string;
	sort?: string | Record<string, "asc" | "desc">;
	order?: "asc" | "desc";
	fields?: string[] | string;
	filter?: Record<string, any>[] | Record<string, any>;
	[key: string]: any;
}

export interface PaginationParams {
	page?: number;
	limit?: number;
}

export interface SearchParams {
	query?: string;
}

export interface SortParams {
	sort?: string | Record<string, "asc" | "desc">;
	order?: "asc" | "desc";
}

export abstract class APIService {
	protected queryParams: Record<string, string> = {};

	// Default parameters
	protected defaults = {
		document: true,
		pagination: true,
		count: false,
	};

	/**
	 * Set field selection for the API request
	 * @param fields Array of field names to select
	 * @returns this for method chaining
	 */
	select(fields: string[] | string): this {
		if (typeof fields === "string") {
			// Split the string by commas or spaces, trim whitespace, and filter out empty strings
			this.queryParams.fields = fields
				.split(/[,|\s]+/) // Split by comma or whitespace
				.map((field) => field.trim()) // Trim whitespace from each field
				.filter((field) => field !== "") // Remove empty strings
				.join(","); // Join back with commas for the query parameter
		} else {
			// Handle array of strings as before
			this.queryParams.fields = fields.join(",");
		}
		return this;
	}

	/**
	 * Set pagination parameters
	 * @param page Page number (default: 1)
	 * @param limit Records per page (default: 10)
	 * @returns this for method chaining
	 */
	paginate(page?: number, limit?: number): this {
		if (page !== undefined) {
			this.queryParams.page = page.toString();
		}
		if (limit !== undefined) {
			this.queryParams.limit = limit.toString();
		}
		return this;
	}

	/**
	 * Enable or disable pagination
	 * @param enabled Whether pagination should be enabled (default: true)
	 * @returns this for method chaining
	 */
	pagination(enabled: boolean = true): this {
		this.queryParams.pagination = enabled.toString();
		return this;
	}

	/**
	 * Enable or disable document population
	 * @param enabled Whether document population should be enabled (default: true)
	 * @returns this for method chaining
	 */
	document(enabled: boolean = true): this {
		this.queryParams.document = enabled.toString();
		return this;
	}

	/**
	 * Enable or disable count in response
	 * @param enabled Whether count should be included (default: false)
	 * @returns this for method chaining
	 */
	count(enabled: boolean = false): this {
		this.queryParams.count = enabled.toString();
		return this;
	}

	/**
	 * Set search query parameter
	 * @param query Search term
	 * @returns this for method chaining
	 */
	search(query?: string): this {
		if (query !== undefined && query !== "") {
			this.queryParams.query = query;
		}
		return this;
	}

	/**
	 * Set sorting parameters
	 * @param sort Field to sort by or object with field and direction
	 * @param order Sort order: 'asc' or 'desc' (default: 'desc')
	 * @returns this for method chaining
	 */
	sort(sort?: string | Record<string, "asc" | "desc">, order?: "asc" | "desc"): this {
		if (sort !== undefined) {
			if (typeof sort === "string") {
				this.queryParams.sort = sort;
				if (order) {
					this.queryParams.order = order;
				}
			} else {
				// Handle object format like {"email": "asc"}
				this.queryParams.sort = JSON.stringify(sort);
			}
		}
		return this;
	}

	/**
	 * Set filter parameters
	 * @param filter Filter object or array of filter objects
	 * @returns this for method chaining
	 */
	filter(filter?: Record<string, any>[] | Record<string, any>): this {
		if (filter !== undefined) {
			// Always convert to array format for consistency with the API
			const filterArray = Array.isArray(filter) ? filter : [filter];
			this.queryParams.filter = JSON.stringify(filterArray);
		}
		return this;
	}

	/**
	 * Apply default parameters
	 * @returns this for method chaining
	 */
	applyDefaults(): this {
		if (this.defaults.document && this.queryParams.document === undefined) {
			this.queryParams.document = "true";
		}
		if (this.defaults.pagination && this.queryParams.pagination === undefined) {
			this.queryParams.pagination = "true";
		}
		if (this.defaults.count !== undefined && this.queryParams.count === undefined) {
			this.queryParams.count = this.defaults.count.toString();
		}
		return this;
	}

	/**
	 * Set all query parameters at once
	 * @param params Object with all query parameters
	 * @returns this for method chaining
	 */
	setParams(params: ApiQueryParams): this {
		// Handle fields
		if (params.fields) {
			this.select(params.fields);
		}

		// Handle pagination
		if (params.page !== undefined || params.limit !== undefined) {
			this.paginate(params.page, params.limit);
		}

		// Handle search
		if (params.query !== undefined) {
			this.search(params.query);
		}

		// Handle sorting
		if (params.sort !== undefined || params.order !== undefined) {
			this.sort(params.sort, params.order);
		}

		// Handle filtering
		if (params.filter !== undefined) {
			this.filter(params.filter);
		}

		// Handle any other custom parameters
		const customParams = { ...params };
		delete customParams.fields;
		delete customParams.page;
		delete customParams.limit;
		delete customParams.query;
		delete customParams.sort;
		delete customParams.order;
		delete customParams.filter;

		// Add any remaining parameters directly to queryParams
		Object.entries(customParams).forEach(([key, value]) => {
			if (value !== undefined && value !== "" && value !== null) {
				this.queryParams[key] = typeof value === "string" ? value : value.toString();
			}
		});

		return this;
	}

	/**
	 * Set query parameters (legacy method for backward compatibility)
	 */
	setQueryParams(params: Record<string, string>): this {
		this.queryParams = { ...this.queryParams, ...params };
		return this;
	}

	/**
	 * Set fields parameter (legacy method for backward compatibility)
	 */
	setFields(fields: string): this {
		this.queryParams.fields = fields;
		return this;
	}

	/**
	 * Clear all query parameters
	 */
	clearQueryParams(): this {
		this.queryParams = {};
		return this;
	}

	/**
	 * Get query string for pagination and filtering
	 * Creates a copy of params to avoid clearing the original
	 */
	protected getQueryString(): string {
		// Apply defaults first
		this.applyDefaults();

		const params = new URLSearchParams();

		Object.entries(this.queryParams).forEach(([key, value]) => {
			if (value !== undefined && value !== "" && value !== null) {
				params.append(key, value);
			}
		});

		const queryString = params.toString();

		// Clear params after generating the string to prevent accumulation
		this.queryParams = {};

		return queryString ? `?${queryString}` : "";
	}
}
