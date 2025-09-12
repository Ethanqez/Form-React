import {document, text, page, styleSheet} from "@react-pdf/render";

function PDF(){
    return(
        <document>
            <page>
                <text>
                    Hola chamo
                </text>
            </page>
        </document>
    )
}

export default PDF