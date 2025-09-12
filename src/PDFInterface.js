import {Document, Text, Page, StyleSheet} from "@react-pdf/render";

function PDF(){
    return(
        <Document>
            <page>
                <Text>
                    Hola chamo
                </Text>
            </page>
        </Document>
    )
}

export default PDF