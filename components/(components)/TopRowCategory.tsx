import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { memo } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { darkTheme, lightTheme } from '@/constants/darkmode';
const TopRowCategory = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const data = [
        {
            label: "All",
            icon: "home-outline",
            color: "red"
        },
        {
            label: "Household",
            icon: "bolt",
            color: "red"
        },
        {
            label: "Clothing",
            icon: "fire",
            color: "red"
        },
        {
            label: "Garden",
            icon: "lightning-bolt",
            color: "yellow"
        },
        {
            label: "More",
            icon: "dots-horizontal",
            color: "yellow"
        },

    ];
    return (
        <View style={{
            paddingVertical: hp(1),
        }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: wp(2),
                    paddingLeft: wp(2)
                }}>
                    {
                        data?.map((item, index) => (
                            <Pressable key={index}>
                                <View style={{
                                    alignItems: 'center',
                                    width: wp(20),
                                }}>
                                    <View style={{
                                        width: wp(14),
                                        height: wp(14),
                                        borderRadius: wp(50),
                                        backgroundColor: theme.menu,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <MaterialCommunityIcons name={item?.icon as any} size={hp(3)} color={"red"} />
                                    </View>
                                    <Text style={{
                                        fontFamily: "PoppinsMedium",
                                        fontSize: hp(1.4),
                                        color: theme.textColor,
                                        marginTop: hp(0.8)
                                    }}>{item?.label}</Text>
                                </View>
                            </Pressable>
                        ))
                    }
                </View>
            </ScrollView >
        </View >
    )
}

export default memo(TopRowCategory)

const styles = StyleSheet.create({})