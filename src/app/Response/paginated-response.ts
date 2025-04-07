import { Blog } from "../model/blog";

export interface PaginatedResponse {
     content: Blog[];    // Array of Employee objects
        totalElements: number;  // Total number of elements in the response
        totalPages: number;     // Total number of pages
        size: number;           // Number of elements per page
        number: number;
}
