import Alert from "@mui/material/Alert";
import Spinner from "src/components/Spinner";

function AsyncWrapper(props: AsyncWrapperProps) {
  if (props.loading) {
    return <Spinner />;
  } else if (props.error) {
    return <Alert severity="error">{JSON.stringify(props.error)}</Alert>;
  } else if (props.fulfilled) {
    return props.children;
  } else {
    return <>Something has happen</>;
  }
}

AsyncWrapper.defaultValue = {
  loading: true,
  fulfilled: false,
  error: null,
  children: <></>,
};

export default AsyncWrapper;
