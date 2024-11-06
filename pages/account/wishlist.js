import AccountLayout from "@/components/layout/AccountLayout";
import ProductCard from "@/components/layout/ProductCard";
import Spinner from "@/components/Spinner";
import useWishlist from "@/hooks/useWishlist";

export default function ProfilePage() {
  const { wishlist, setWishlist, loading } = useWishlist();

  return (
    <AccountLayout title="My wishlist">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {wishlist.length > 0 ? (
            <div className="flex flex-col lg:grid grid-cols-2 gap-5 md:p-3">
              {wishlist.map((product, index) => (
                <ProductCard
                  key={product._id}
                  index={index}
                  {...product}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              ))}
            </div>
          ) : (
            <h3 className="flex justify-center mt-10 text-color-800">
              No products in your wishlist.
            </h3>
          )}
        </>
      )}
    </AccountLayout>
  );
}
