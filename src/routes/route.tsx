import { ErrorBoundary } from "react-error-boundary";
import App from "../App";
import { ErrorReturn } from "../components/common/Layout/ErrorBoundary";
import { createBrowserRouter } from "react-router-dom";
import ProductList from "../components/product";
import ProductDetailContent from "../components/product/components/productDetailsContent";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary
        FallbackComponent={ErrorReturn}
        onReset={() => (location.href = "/")}
      >
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path:"/",
        element: <ProductList />,
    
        
      },
      { 
        path: "/products/:id",
        element: <ProductDetailContent productId={0} />}
    ],
  },
]);
export default routes;
