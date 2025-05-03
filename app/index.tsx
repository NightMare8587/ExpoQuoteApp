import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export default function MainFile() {
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [quote, setQuote] = useState(null);
  const [getNewQuote, setGetNewQuote] = useState(false);
  useEffect(() => {
    async function fetchQuote() {
      setIsRefreshing(true);
      try {
        const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
          method: "GET",
          headers: {
            "X-Api-Key": "QWVmZctdYW4YpkfDpWo3FQ==wXY4nywggcU6OOs9",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQuote(data[0]); // API returns an array of quotes
        } else {
          console.error("API Error:", response.status, await response.text());
        }
      } catch (error) {
        console.error("Network Error:", error);
      } finally {
        setIsRefreshing(false);
      }
    }

    fetchQuote();
  }, [getNewQuote]);

  const cta = () => {
    setGetNewQuote(!getNewQuote);
  };
  return (
    <View style={styles.container}>
      {isRefreshing ? (
        <>
          <ActivityIndicator
            size={50}
            color="#5686e1"
            style={{ position: "absolute", top: "40%", left: "41%" }}
          />
        </>
      ) : (
        <View>
          <Image
            style={styles.imageStyles}
            width={45}
            height={45}
            resizeMode="contain"
            source={require("../assets/quote-image.png")}
          />
          {quote && <Text style={styles.quoteStyle}>{quote.quote}</Text>}
          {quote && <Text style={styles.authorStyle}>{quote.author}</Text>}

          <TouchableOpacity style={styles.buttonStyle} onPress={cta}>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              New Quote
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 65,
    marginStart: 20,
  },
  imageStyles: {},
  quoteStyle: {
    fontSize: 27,
    marginTop: 20,
    marginEnd: 10,
    marginStart: 10,
    fontStyle: "italic",
  },
  authorStyle: {
    fontSize: 30,
    marginTop: 20,
    textAlign: "center",
    alignSelf: "center",
    fontStyle: "normal",
    marginHorizontal: "auto",
  },
  buttonStyle: {
    backgroundColor: "#5686e1",
    marginHorizontal: "auto",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
