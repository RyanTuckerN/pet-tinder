import { TextField, Button } from "@material-ui/core";
import useWindowDimensions from "./customHooks/useWindowDimension";

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
    // backgroundColor: '#fff1cc'
  };
  return (
    <div style={bottomPush}>
      <form
        action="submit"
        onSubmit={handleSubmit}
        style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
      >
        <TextField
          label="Direct message"
          id="outlined-size-normal"
          variant="outlined"
          value={chatMessage}
          onChange={handleChange}
          style={{ width: open ? width - 320 : width - 170 }}
        />
        <Button type="submit">SEND</Button>
      </form>
    </div>
  );
};

export default StickyFooter