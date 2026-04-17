import { supabase } from "../../lib/supabase";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Home() {
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error)
        {
            console.error("Error with signing out", error.message);
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome Home!</Text>
        <Text style={styles.subtitle}>You are now inside the protected route.</Text>
            <View style={styles.buttonContainer}>
                <Button 
                title="Sign Out" 
                onPress={handleSignOut} 
                color="#550d09" 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
});