import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useProducts } from '@/query/productQuery';
import { darkTheme, lightTheme } from '@/constants/darkmode';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
const ProductResult = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const category = ""
    const {
        data,
        isPending,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useProducts(category);
    const loadNext = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };
    const ListFooterComponent = useMemo(
        () => (
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                {isFetchingNextPage && <ActivityIndicator size={'small'} color={"gray"} />}
            </View>
        ),
        [isFetchingNextPage]
    );
    const onRefresh = useCallback(() => {
        setLoading(true);
        queryClient.invalidateQueries({ queryKey: ['products', category] });
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    if (isPending) {
        return (
            <View style={{
                marginTop: hp(4)
            }}>
                <ActivityIndicator size={'small'} color={"gray"} />
            </View>
        )
    };
    return (
        <View>
            {
                !data?.length ? <View></View>
                    :
                    <FlatList
                        style={{
                            height: hp(77)
                        }}
                        data={data}
                        keyExtractor={(item) => item.id?.toString()}
                        renderItem={({ item }) => {
                            return (
                                <Pressable style={{
                                    backgroundColor: theme.menu,
                                    marginTop: hp(1),
                                    marginHorizontal: wp(4),
                                    borderRadius: wp(2),
                                }}>
                                    <View style={{
                                        overflow: 'hidden'
                                    }}>
                                        <Image
                                            source={{ uri: item?.imageUrl }}
                                            resizeMode='cover'
                                            style={{
                                                height: hp(25),
                                                borderRadius: wp(2),
                                            }}
                                        />
                                        <View style={{
                                            backgroundColor: "#FFFFFF",
                                            paddingHorizontal: wp(2),
                                            paddingVertical: hp(0.5),
                                            position: 'absolute',
                                            top: hp(2),
                                            left: wp(2),
                                            borderRadius: wp(1),
                                        }}>
                                            <Text style={{
                                                fontFamily: "PoppinsMedium",
                                                fontSize: hp(1.4),
                                            }}>{item?.category}</Text>
                                        </View>

                                        <View style={{
                                            position: 'absolute',
                                            right: -40,
                                            top: 20,
                                            width: wp(40),
                                            transform: [{ rotate: "40deg" }],
                                            backgroundColor: item?.dealType === "SALE" ? "#FF3B30" : "#007AFF",
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontFamily: "PoppinsMedium",
                                                fontSize: hp(1.5),
                                                color: "#FFFFFF",
                                            }}>{item?.dealType}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        paddingHorizontal: wp(2),
                                        marginVertical: hp(2),
                                    }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text
                                                style={{
                                                    width: wp(60),
                                                    fontFamily: "PoppinsMedium",
                                                    fontSize: hp(1.6),
                                                    color: theme.textColor
                                                }}
                                            >{item?.name}</Text>
                                            <Text
                                                style={{
                                                    fontFamily: "PoppinsSemiBold",
                                                    fontSize: hp(1.8),
                                                    paddingRight: wp(2),
                                                    color: "red"
                                                }}
                                            >AU${item?.price}</Text>
                                        </View>


                                        <View style={{
                                            marginTop: hp(1)
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: wp(2),
                                            }}>
                                                <Ionicons name='speedometer-outline' size={hp(2)} color={'red'} />
                                                <Text style={{
                                                    fontFamily: "PoppinsRegular",
                                                    fontSize: hp(1.4),
                                                    color: theme.textColor
                                                }}>{item?.distanceInKm} mi</Text>
                                            </View>

                                            <Text style={{
                                                fontFamily: "PoppinsMedium",
                                                fontSize: hp(1.4),
                                                marginTop: hp(1),
                                                color: "#616161"
                                            }}>Posted: {moment(item?.postedAt).format('LLL')}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        }}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                        }
                        onEndReached={loadNext}
                        onEndReachedThreshold={0.3}
                        ListFooterComponent={ListFooterComponent}
                    />
            }
        </View>
    )
}

export default memo(ProductResult)

const styles = StyleSheet.create({})