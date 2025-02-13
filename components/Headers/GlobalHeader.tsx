import { Alert, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { memo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

const GlobalHeader = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    return (
        <View style={{ paddingTop: insets?.top + hp(1.5), paddingHorizontal: wp(5), paddingBottom: hp(1) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{
                    fontFamily: "PoppinsSemiBold",
                    fontSize: hp(2.2),
                    color: theme.textColor
                }}>👋 Marketplace</Text>

                <Pressable style={{
                    padding: wp(1.5),
                    backgroundColor: theme.menu,
                    borderRadius: wp(50),
                }}
                    onPress={() => Alert.alert("Feature Coming Soon", "We’re working hard to bring this page to life. Stay tuned for updates!")}
                >
                    <Ionicons name='notifications' size={hp(2.6)} color={"red"} />
                </Pressable>

            </View>
        </View>
    )
}

export default memo(GlobalHeader)

const styles = StyleSheet.create({})