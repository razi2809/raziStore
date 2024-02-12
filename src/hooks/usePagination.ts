import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import notify from "../services/toastService";
import { ROUTER } from "../Router/ROUTER";
const ITEM_PER_PAGE = 6;
const usePagination = <T,>(data: T[]) => {
  const [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  // get the current page from URL search parameters or default to the first page.
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [numPages, setNumPages] = useState(0);
  const [currentData, setCurrentData] = useState<T[]>([]);

  useEffect(() => {
    // Update the current page's data whenever the current page or the data changes.
    const start = (currentPage - 1) * ITEM_PER_PAGE;
    const end = start + ITEM_PER_PAGE;
    setCurrentData(data.slice(start, end));
  }, [currentPage, data]);
  useEffect(() => {
    // Calculate the total number of pages
    const newNumPages = Math.ceil(data.length / ITEM_PER_PAGE);
    setNumPages(newNumPages);
    // If the current page is greater than the number of pages and there is at least one page,
    // redirect to the home page
    if (currentPage > newNumPages && newNumPages > 0) {
      navigate(`${ROUTER.HOME}#${encodeURIComponent("all businesses")}`);
      notify.warning("this page become empty, redirecting...");
    }
  }, [data.length, currentPage, navigate]);
  const goToPage = (pageNumber: number) => {
    // set the page to new number.
    setCurrentPage(pageNumber);
  };
  return { currentData, currentPage, numPages, goToPage };
};

export default usePagination;
