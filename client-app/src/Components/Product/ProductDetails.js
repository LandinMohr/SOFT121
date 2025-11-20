import { useParam } from 'react-router';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
}
    useEffect(() => {
        if (!productId) return;
        //declare async function to fetch product details
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch
                (`http://localhost:5156//product/${productId}//
                // `);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            }catch (error) {
             setError(error);
            } finally {
             setLoading(false);
            }
        };

        //call the function to fetch product details
        fetchProduct();
    }, [productId]);

        return(
        <div><h2>Product Details</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>discount: ${product.discountPercent}</p>
        </div>
        )
