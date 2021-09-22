import { TextField, Button } from "@material-ui/core";
import useWindowDimensions from "../customHooks/useWindowDimension";
import "./Chat.css";

const StickyFooter = (props) => {
  const { handleChange, handleSubmit, chatMessage, open } = props;
  const { width } = useWindowDimensions();
  const bottomPush = {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 20,
    paddingTop: 20,
    marginLeft: 10,
    height: "100px",
    paddingRight: "0 !important",
    paddingLeft: "0 !important",
    width: "100vw",
  };
  return (
    <div style={bottomPush} id="sticky-footer">
      <form
        action="submit"
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: width >= 600 ? "flex-start" : "center",
        }}
      >
        <TextField
          label="Message"
          className="chat-input"
          variant="outlined"
          value={chatMessage}
          onChange={handleChange}
          style={{
            width:
              width >= 600 ? (open ? width - 320 : width - 180) : width - 100,
          }}
        />
        <Button type="submit">SEND</Button>
      </form>
    </div>
  );
};

export default StickyFooter;
