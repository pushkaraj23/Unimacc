import OrdersSection from "../shared/OrdersSection";

const ProfileOrders = ({ userid }) => {
  return (
    <div>
      <OrdersSection userid={userid} />
    </div>
  );
};

export default ProfileOrders;
