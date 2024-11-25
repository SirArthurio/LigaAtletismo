import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#f7f7f7',
      padding: 30,
      fontFamily: 'Helvetica',
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
      textTransform: 'uppercase',
      borderBottomWidth: 2,
      borderBottomColor: '#4CAF50',
      paddingBottom: 10,
    },
    section: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    sectionTitle: {
      fontSize: 18,
      color: '#4CAF50',
      marginBottom: 10,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 14,
      color: '#555',
      lineHeight: 1.5,
    },
    footer: {
      fontSize: 12,
      color: '#777',
      marginTop: 30,
      textAlign: 'center',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      paddingTop: 10,
    },
  });
  
export const MyDocument = ({ items }) => {
  const facturas = Array.isArray(items) ? items : [items];

  return (
    <Document>
      {facturas.map((item) => (
        <Page size="A4" style={styles.page} key={item._id || Math.random()}>
          <Text style={styles.header}>Factura #{item._id}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detalles de la Factura</Text>
            <Text style={styles.text}>Fecha: {new Date(item.fecha).toLocaleDateString()}</Text>
            <Text style={styles.text}>Total: ${item.total}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Productos</Text>
            {item.productos.map((producto) => (
              <Text style={styles.text} key={producto._id}>
                - {producto.name}: ${producto.price} x {producto.amount}
              </Text>
            ))}
          </View>

          <Text style={styles.footer}>Gracias por su compra</Text>
        </Page>
      ))}
    </Document>
  );
};