import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {

  const dispatch = useAppDispatch();

  const { id } = useParams();

  //! Temporary code, should be replaced with redux
  const [data, setData] = useState<IProduct[]>([]);
  useEffect(() => {
    fetch('../../public/data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);

  const product = data?.find((item) => item._id === Number(id));
  console.log(product);

  //! Temporary code ends here

  return (
    <>
      <div className="flex w-5/6 mx-auto items-center border-b-2 border-gray-300">
        <div className="w-1/2">
          <img src={product?.image} alt="" className='w-5/6' />
        </div>
        <div className="w-1/2 space-y-3">
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.features?.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button onClick={() => dispatch(addToCart(product!))}>Add to cart</Button>
        </div>
      </div>
      <ProductReview />
    </>
  );
}
