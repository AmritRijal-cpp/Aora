import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import {signOut} from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const Profile = () => {

  const {isSubmitting} = useGlobalContext();
  return (
    <View className="h-full justify-center items-center">
      <Text>Profile for me</Text>
      <CustomButton
            title="Sign Out"
            handlePress={signOut}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})