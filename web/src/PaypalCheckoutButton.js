import { PayPalButtons } from "@paypal/react-paypal-js"
import { useStateValue } from "./StateProvider";
import "./PaypalCheckoutButton.css"

const PaypalCheckoutButton = (props) => {
  const { product } = props;
  const [{basket, user}, dispatch] = useStateValue();
  const style = {"layout": "horizontal", "margin-top": "20px"}

	return (
		<div className="paypalCheckoutButton">
            <PayPalButtons style={style} disabled={basket?.length === 0}/>
		</div>
	);
};

export default PaypalCheckoutButton;