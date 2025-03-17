export default function PaginationControls({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex justify-center items-center space-x-2 mt-6">
            {/* Previous */}
            <button onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50">
                Previous
            </button>

            {/* Current Page */}
            <span className="px-4 py-2 border rounded bg-gray-200">{currentPage}</span>

            {/* Next */}
            <button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50">
                Next
            </button>
        </div>
    );
}
