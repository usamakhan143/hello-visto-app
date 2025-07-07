import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
} from "../../constants";

interface ProfileScreenProps {
  navigation: any;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Ahmed Riaz",
    email: "ahmed.riaz@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Passionate traveler exploring the world one destination at a time.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  });

  const stats = [
    { label: "Tours Booked", value: "12", icon: "airplane" },
    { label: "Countries", value: "8", icon: "earth" },
    { label: "Reviews", value: "24", icon: "star" },
  ];

  const menuItems = [
    {
      id: "bookings",
      title: "My Bookings",
      icon: "calendar-outline",
      onPress: () => navigation.navigate("MyBookings"),
    },
    {
      id: "wishlist",
      title: "Wishlist",
      icon: "heart-outline",
      onPress: () => navigation.navigate("Wishlist"),
    },
    {
      id: "reviews",
      title: "My Reviews",
      icon: "star-outline",
      onPress: () => navigation.navigate("MyReviews"),
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: "notifications-outline",
      onPress: () => navigation.navigate("Notifications"),
    },
    {
      id: "support",
      title: "Help & Support",
      icon: "help-circle-outline",
      onPress: () => navigation.navigate("Support"),
    },
    {
      id: "settings",
      title: "Settings",
      icon: "settings-outline",
      onPress: () => navigation.navigate("Settings"),
    },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            const { AuthService } = await import("../../services/firebase");
            await AuthService.signOut();
            // AuthContext will automatically handle navigation
          } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to logout");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Ionicons
            name={isEditing ? "checkmark" : "pencil-outline"}
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Card variant="elevated" style={styles.profileCard}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.profileGradient}
          >
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: userProfile.avatar }}
                  style={styles.avatar}
                />
                {isEditing && (
                  <TouchableOpacity style={styles.avatarEdit}>
                    <Ionicons name="camera" size={16} color={COLORS.white} />
                  </TouchableOpacity>
                )}
              </View>

              {isEditing ? (
                <Input
                  value={userProfile.name}
                  onChangeText={(text) =>
                    setUserProfile({ ...userProfile, name: text })
                  }
                  style={styles.nameInput}
                />
              ) : (
                <Text style={styles.profileName}>{userProfile.name}</Text>
              )}

              <Text style={styles.profileEmail}>{userProfile.email}</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Ionicons name={stat.icon} size={20} color={COLORS.white} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </Card>

        {/* Profile Information */}
        {isEditing ? (
          <Card variant="elevated" style={styles.editCard}>
            <Text style={styles.sectionTitle}>Edit Profile</Text>
            <View style={styles.form}>
              <Input
                label="Phone Number"
                value={userProfile.phone}
                onChangeText={(text) =>
                  setUserProfile({ ...userProfile, phone: text })
                }
                leftIcon="call-outline"
              />
              <Input
                label="Location"
                value={userProfile.location}
                onChangeText={(text) =>
                  setUserProfile({ ...userProfile, location: text })
                }
                leftIcon="location-outline"
              />
              <Input
                label="Bio"
                value={userProfile.bio}
                onChangeText={(text) =>
                  setUserProfile({ ...userProfile, bio: text })
                }
                multiline
                numberOfLines={3}
              />
            </View>
            <Button
              title="Save Changes"
              variant="primary"
              size="md"
              onPress={handleSaveProfile}
              icon="checkmark"
              iconPosition="right"
            />
          </Card>
        ) : (
          <Card variant="elevated" style={styles.infoCard}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.infoItem}>
              <Ionicons
                name="call-outline"
                size={20}
                color={COLORS.textSecondary}
              />
              <Text style={styles.infoText}>{userProfile.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons
                name="location-outline"
                size={20}
                color={COLORS.textSecondary}
              />
              <Text style={styles.infoText}>{userProfile.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.textSecondary}
              />
              <Text style={styles.infoText}>{userProfile.bio}</Text>
            </View>
          </Card>
        )}

        {/* Menu Items */}
        <Card variant="elevated" style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.menuIcon,
                    { backgroundColor: `${COLORS.primary}15` },
                  ]}
                >
                  <Ionicons name={item.icon} size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </Card>

        {/* Logout */}
        <Card variant="elevated" style={styles.logoutCard}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Card>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Hello Visto Travel App v1.0.0</Text>
          <Text style={styles.appInfoText}>
            © 2024 Hello Visto. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
    padding: 0,
    overflow: "hidden",
  },
  profileGradient: {
    padding: SPACING.xl,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: SPACING.base,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.full,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  avatarEdit: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  profileEmail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    opacity: 0.9,
  },
  nameInput: {
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 0,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    gap: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    opacity: 0.9,
  },
  editCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
  },
  infoCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.base,
  },
  form: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.base,
    gap: SPACING.base,
  },
  infoText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    flex: 1,
  },
  menuCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.base,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
  },
  logoutCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  logoutText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.error,
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    gap: SPACING.xs,
  },
  appInfoText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
  },
});
