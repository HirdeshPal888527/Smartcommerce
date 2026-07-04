import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useProductStore from "../../store/productStore";
import ProductInfo from "../../components/product/ProductInfo";
import ProductGallery from "../../components/product/ProductGallery";
import ProductSpecifications from "../../components/product/ProductSpecifications";
import ProductVariants from "../../components/product/ProductVariants";
import Breadcrumb from "../../components/product/BreadCrumb";
import RelatedProducts from "../../components/product/RelatedProducts";

function ProductDetailsPage() {
    const { id } = useParams();

    const {
        selectedProduct,
        fetchProductById,
        isProductLoading,
        fetchProducts,
        products,
    } = useProductStore();

    useEffect(() => {
        fetchProductById(id);
        fetchProducts();
    }, [id]);

    if (isProductLoading) {
        return <h1>Loading...</h1>;
    }

    if (!selectedProduct) {
        return <h1>Product not found.</h1>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

            <Breadcrumb product={selectedProduct} />

            <div className="grid gap-12 lg:grid-cols-2 items-start">

                <ProductGallery
                    images={selectedProduct.images}
                    name={selectedProduct.name}
                />

                <div className="space-y-8">

                    <ProductInfo
                        product={selectedProduct}
                    />

                    <ProductVariants
                        variants={selectedProduct.variants}
                    />

                </div>

            </div>

            <ProductSpecifications
                specifications={selectedProduct.specifications}
            />

            <RelatedProducts
                products={products}
                currentProductId={selectedProduct._id}
            />

        </div>
    );
}

export default ProductDetailsPage;