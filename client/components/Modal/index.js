import { connect }  from "react-redux";
import { closeModal } from "../../actions/modal";
import Modal from "./Modal.jsx";


function mapDispatchToProps(dispatch) {
    return {
        onExit: () => dispatch(closeModal()),
    }
}

export default connect(null, mapDispatchToProps)(Modal);