import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "react-modal";
const customStyles = {
    content: {
        top: "20%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        minWidth: "40%",
    },
};

export default function Component(props: any) {
    return (
        <div>
            <Modal isOpen={props.isOpen} style={customStyles}>
                { props.children }
                <Button
                    variant="default"
                    color="primary"
                    onClick={() => {
                        props.setClose();
                    }}
                > CloseWindow</Button>
            </Modal>
        </div>
    );
}