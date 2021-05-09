import React from 'react';

export interface PaginatorProps {
    currentPage: number;
    numPages: number;
    onChangePage: (page: number) => void;
}

// Adapted from https://tailwindui.com/components/application-ui/navigation/pagination
export function Paginator({ currentPage, numPages, onChangePage }: PaginatorProps) {
    return (
        <div className="m-4">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {currentPage > 1 && (
                    <div
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all cursor-pointer"
                        onClick={(_) => onChangePage(currentPage - 1)}
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                )}

                {[...Array(numPages).keys()]
                    .map((pageNumber) => pageNumber + 1)
                    .map((pageNumber) => (
                        <div
                            key={pageNumber}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium  hover:bg-gray-50 transition-all cursor-pointer ${
                                pageNumber === currentPage ? 'font-bold text-gray-700' : 'text-gray-500'
                            } ${pageNumber === currentPage && currentPage === 1 ? 'rounded-l-md' : ''} ${
                                pageNumber === currentPage && currentPage === numPages ? 'rounded-r-md' : ''
                            }`}
                            onClick={(_) => onChangePage(pageNumber)}
                        >
                            {pageNumber}
                        </div>
                    ))}

                {currentPage < numPages && (
                    <div
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all cursor-pointer"
                        onClick={(_) => onChangePage(currentPage + 1)}
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                )}
            </nav>
        </div>
    );
}
