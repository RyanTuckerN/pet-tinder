import { TextField, Button } from "@material-ui/core";
import useWindowDimensions from "../customHooks/useWindowDimension";

const StickyFooter = (props) => {
  const { handleChange, handleSubmit, chatMessage, open } = props;
  const { width } = useWindowDimensions();
  const bottomPush = {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 20,
    paddingTop: 20,
    height: "100px",
    backgroundColor: 'gainsboro', //MAKE SURE THIS MATCHES MAIN BACKGROUND!!
    paddingRight: '0 !important',
    paddingLeft: '0 !important',
    // marginRight:'auto',
    width: open ? width - 210 : width - 75
    
  };
  return (
    <div style={bottomPush}>
      <form
        action="submit"
        onSubmit={handleSubmit}
        style={{ width: "100%",  display: open && width < 470 ? 'none' : 'flex' , justifyContent: "flex-start" }}
      >
        <TextField
          label=""
          id="outlined-size-normal"
          variant="outlined"
          value={chatMessage}
          onChange={handleChange}
          style={{ width: open ? width - 320 : width - 180}}
        />
        <Button type="submit">SEND</Button>
      </form>
    </div>
  );
};

export default StickyFooter