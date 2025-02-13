import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import GlobalHeader from '@/components/Headers/GlobalHeader'
import { darkTheme, lightTheme } from '@/constants/darkmode';
import TopRowCategory from '@/components/(components)/TopRowCategory';
import ProductResult from '@/components/(components)/ProductResult';
const Page = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const [selectCategory, setSelectCategory] = useState<string>("");
    const handleMemoSelect = useCallback((value: string) => {
        setSelectCategory(value);
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            <GlobalHeader />
            <TopRowCategory handleMemoSelect={handleMemoSelect} selectCategory={selectCategory} />
            <ProductResult selectCategory={selectCategory} />
        </View>
    )
}
export default Page

const styles = StyleSheet.create({})