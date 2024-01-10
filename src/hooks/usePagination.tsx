import { useState, useEffect } from "react";
import { IBusiness } from "../@types/business";
import { useNavigate, useSearchParams } from "react-router-dom";
const ITEM_PER_PAGE = 6;

function usePagination(data: IBusiness[]) {
  const [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  // get the current page from URL search parameters or default to the first page.
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [numPages, setNumPages] = useState(0);
  const [currentData, setCurrentData] = useState<IBusiness[]>([]);

  useEffect(() => {
    // Calculate the total number of pages whenever the data or items per page change.
    //Get change on inial data change
    setNumPages(Math.ceil(data.length / ITEM_PER_PAGE));
  }, [data.length]);

  useEffect(() => {
    // Update the current page's data whenever the current page or the data changes.

    const start = (currentPage - 1) * ITEM_PER_PAGE;
    const end = start + ITEM_PER_PAGE;
    setCurrentData(data.slice(start, end));
  }, [currentPage, data]);
  useEffect(() => {
    // Calculate the total number of pages
    // if (numPages === 0) return;
    const newNumPages = Math.ceil(data.length / ITEM_PER_PAGE);
    setNumPages(newNumPages);

    // If the current page is greater than the number of pages and there is at least one page,
    // redirect to the home page
    if (currentPage > newNumPages && newNumPages > 0) {
      navigate(`/home#${encodeURIComponent("all businesses")}`);
    }
  }, [data.length]);

  const goToPage = (pageNumber: number) => {
    // set the page to new number.
    setCurrentPage(pageNumber);
  };

  return { currentData, currentPage, numPages, goToPage };
}

export default usePagination;
