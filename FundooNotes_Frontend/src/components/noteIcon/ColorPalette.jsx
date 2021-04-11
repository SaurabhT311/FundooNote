import React, { useState } from "react";
import { IconButton, Menu, MenuItem} from "@material-ui/core";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import { makeStyles } from "@material-ui/core/styles";

function ColorPalette(props) {
    const useStyles = makeStyles(() => ({

        button: {
            marginLeft:'-10px',
            marginRight:'-10px',
            display:"flex"

        },
        colorBox: {
            width: "125px",
            height: "90px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "4px",
        },
        
        colorOption: {
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            border: "1px solid grey",
            margin: "0.02rem 0.1rem",
        },
    }));

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
   

    const colors = [
        "#ffffff",
        "#f28b82",
        "#fbbc04",
        "#fff475",
        "#ccff90",
        "#a7ffeb",
        "#cbf0f8",
        "#aecbfa",
        "#d7aefb",
        "#fdcfe8",
        "#e6c9a8",
        "#e8eaed",
    ];


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const displayColorPallet = (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            getContentAnchorEl={null}
        >
            <MenuItem className={classes.colorBox}>
                {colors.map((color, index) => {
                    return (
                        <IconButton
                            key={index}
                            style={{ backgroundColor: color}}
                            className={classes.colorOption}
                            onClick={() => {
                                handleClose();
                            }}>
                        </IconButton>
                    );
                })}
            </MenuItem>
        </Menu>
    );
    return (
        <div>
            {displayColorPallet}
                <IconButton title="change color"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onMouseEnter={handleClick}
                    // onMouseLeave={handleClose}
                    onClick={handleClick}
                >
                    <PaletteOutlinedIcon className={classes.button} fontSize="small" />
                </IconButton>
            
        </div>
    );
}

export default ColorPalette;