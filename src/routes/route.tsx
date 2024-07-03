import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import ProductDetailContent from "../components/product/components/productDetailsContent";
import ErrorBoundaryWrapper from "../components/common/ErrorBoundaryWrapper";
import ProductList from "../components/product";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundaryWrapper>
        <App />
      </ErrorBoundaryWrapper>
    ),
    children: [
      {
        path:"/",
        element: <ProductList />,
      },
      { 
        path: "/products/:id",
        element: <ProductDetailContent />}
    ],
  },
]);
export default routes;
