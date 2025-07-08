import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
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
  SHADOWS,
  ACCESSIBLE_TEXT_PROPS,
} from "../../constants";
import {
  responsiveFont,
  responsiveSize,
  responsiveSpacing,
} from "../../utils/responsiveFont";

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
    memberSince: "Member since 2022",
  });

  const stats = [
    {
      label: "Tours Booked",
      value: "12",
      icon: "airplane",
      color: COLORS.primary,
    },
    { label: "Countries", value: "8", icon: "earth", color: COLORS.secondary },
    { label: "Reviews", value: "24", icon: "star", color: COLORS.warning },
    { label: "Favorites", value: "7", icon: "heart", color: COLORS.error },
  ];

  const menuSections = [
    {
      title: "Travel",
      items: [
        {
          id: "bookings",
          title: "My Bookings",
          icon: "calendar-outline",
          badge: "3",
          onPress: () => navigation.navigate("MyBookings"),
        },
        {
          id: "favorites",
          title: "Favorites",
          icon: "heart-outline",
          badge: "7",
          onPress: () => navigation.navigate("Favorites"),
        },
        {
          id: "reviews",
          title: "My Reviews",
          icon: "star-outline",
          onPress: () => navigation.navigate("Reviews"),
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          id: "notifications",
          title: "Notifications",
          icon: "notifications-outline",
          onPress: () => navigation.navigate("Notifications"),
        },
        {
          id: "privacy",
          title: "Privacy & Security",
          icon: "shield-checkmark-outline",
          onPress: () => navigation.navigate("Privacy"),
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
      ],
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
          } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to logout");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header - Consistent with other screens */}
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

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Profile Header Card */}
        <Card variant="elevated" style={styles.profileCard}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryLight || COLORS.accent]}
            style={styles.profileGradient}
          >
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: userProfile.avatar }}
                  style={styles.avatar}
                />
                <View style={styles.statusDot} />
                {isEditing && (
                  <TouchableOpacity style={styles.avatarEdit}>
                    <Ionicons name="camera" size={16} color={COLORS.white} />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userProfile.name}</Text>
                <Text style={styles.profileEmail}>{userProfile.email}</Text>
                <View style={styles.memberBadge}>
                  <Ionicons name="diamond" size={12} color={COLORS.warning} />
                  <Text style={styles.memberText}>Premium Member</Text>
                </View>
                <Text style={styles.memberSince}>
                  {userProfile.memberSince}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </Card>

        {/* Travel Stats */}
        <Card variant="elevated" style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Travel Statistics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <View
                  style={[
                    styles.statIcon,
                    { backgroundColor: `${stat.color}15` },
                  ]}
                >
                  <Ionicons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Profile Information */}
        {isEditing ? (
          <Card variant="elevated" style={styles.editCard}>
            <Text style={styles.sectionTitle}>Edit Profile</Text>
            <View style={styles.form}>
              <Input
                label="Full Name"
                value={userProfile.name}
                onChangeText={(text) =>
                  setUserProfile({ ...userProfile, name: text })
                }
                leftIcon="person-outline"
              />
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
            <Text style={styles.sectionTitle}>Personal Information</Text>
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
                name="chatbubble-outline"
                size={20}
                color={COLORS.textSecondary}
              />
              <Text style={styles.infoText}>{userProfile.bio}</Text>
            </View>
          </Card>
        )}

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <Card key={section.title} variant="elevated" style={styles.menuCard}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index === section.items.length - 1 && styles.lastMenuItem,
                ]}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </View>
                <View style={styles.menuItemRight}>
                  {item.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.textSecondary}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        ))}

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

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
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
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  profileCard: {
    marginBottom: SPACING.lg,
    padding: 0,
    overflow: "hidden",
  },
  profileGradient: {
    padding: SPACING.xl,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: SPACING.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  statusDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  avatarEdit: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileInfo: {
    flex: 1,
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
    marginBottom: SPACING.sm,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
    alignSelf: "flex-start",
    marginBottom: SPACING.xs,
    gap: SPACING.xs,
  },
  memberText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  memberSince: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    opacity: 0.8,
  },
  statsCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.base,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  editCard: {
    marginBottom: SPACING.lg,
  },
  form: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  infoCard: {
    marginBottom: SPACING.lg,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.base,
  },
  infoText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    flex: 1,
  },
  menuCard: {
    marginBottom: SPACING.lg,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.base,
  },
  menuTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
    flex: 1,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    minWidth: 20,
    alignItems: "center",
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  logoutCard: {
    marginBottom: SPACING.lg,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.base,
    gap: SPACING.sm,
  },
  logoutText: {
    fontSize: FONT_SIZES.base,
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
    textAlign: "center",
  },
  bottomSpacer: {
    height: 80,
  },
});
