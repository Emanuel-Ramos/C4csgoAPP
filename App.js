import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, View, Alert, Button} from 'react-native';
import CountDown from 'react-native-countdown-component';
import { Audio } from 'expo-av';






export default function Bomb() {

    const [play, setPlay] = useState(false)
    const [sound, setSound] = useState()
    const senha = '7355608'
    const [digito, setDigito] = useState('')
    const [contador, setContador] = useState(0)
    const [defusando, setDefuse] = useState(false)
    
    async function senhaErrada() {
        
    
        const {sound} = await Audio.Sound.createAsync(
            require('./src/assets/errada.mp3')
        );
        setSound(sound)
        await sound.playAsync()
        
    }
    
    async function defused() {
        
        
        const {sound} = await Audio.Sound.createAsync(
            require('./src/assets/bombDefused.mp3')
        );
        setSound(sound)
        await sound.playAsync()
        
    }
    
    async function defusePlay() {
        
    
        const {sound} = await Audio.Sound.createAsync(
            require('./src/assets/defuse.mp3')
        );
        setSound(sound)
        await sound.playAsync()
        
        
    }
    
    
    async function playSound() {
        
    
        const {sound} = await Audio.Sound.createAsync(
            require('./src/assets/c4Sound.mp3')
        );
        setSound(sound)
        await sound.playAsync()
        
    }

    const defuse = <View>
        <CountDown
            until={10}
            onFinish={() => desarmouBomba()}
            onPress={() => setDefuse(false)}
            size={50}
            timeToShow={['S']}
            timeLabels={{ s: '' }}
            digitStyle={{ backgroundColor: '#070808', borderRadius: 10, borderWidth: 2, borderColor: '#ff0019' }}
            digitTxtStyle={{ color: '#ff0019' }}

        />
    </View>

    const relogioDefuse = <View>
        <CountDown
            until={50}
            onFinish={() => setPlay(false)}
            onPress={() => desarmandoBomba()}
            size={50}
            timeToShow={['S']}
            timeLabels={{ s: '' }}
            digitStyle={{ backgroundColor: '#070808', borderRadius: 10, borderWidth: 2, borderColor: '#ff0019' }}
            digitTxtStyle={{ color: '#ff0019' }}

        />
    </View>

    
    function desarmandoBomba() {
        setDefuse(true)
        defusePlay()
    }    

    function desarmouBomba(){
        setPlay(false)
        setDefuse(false)
        defused()
        
    }

    function password(newDigit) {
        let ddDigit = digito + newDigit
        setDigito(ddDigit)
        if (contador < 7){
        verificaNum(newDigit)
        }
       
        
        
        if (contador === 7) {
            if (digito == senha) {
                setPlay(true)
                setDigito('')
                setContador(0)
                playSound()
                
            }
            else {
                
                setDigito('')
                setContador(0)
            }
        }
    
    
    }
    
    function verificaNum(num) {
        
        
        if (senha[contador] !== num) {
            senhaErrada()
           
            setDigito('')
            setContador(0)
            
        }
        else{
        setContador(contador + 1)
        }
    }
    const senhaBomb =
        <View style={{ paddingTop: 240 }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.bomb} onPress={() => password('1')} />
                <TouchableOpacity style={styles.bomb} onPress={() => password('2')}  />
                <TouchableOpacity style={{
                    marginBottom: 1,
                    marginLeft: 15,
                    width: 55,
                }} onPress={() => password('3')} />


            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.bomb2} onPress={() => password('4')} />
                <TouchableOpacity style={styles.bomb2} onPress={() => password('5')} />
                <TouchableOpacity style={{
                    height: 55,
                    width: 55,
                }} onPress={() => password('6')} />


            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.bomb3} onPress={() => password('7')} />
                <TouchableOpacity style={styles.bomb3} onPress={() => password('8')} />
                <TouchableOpacity style={{
                    height: 55,
                    width: 55,
                }} onPress={() => password('9')} />


            </View>
            <View style={{ alignItems: 'center' , flexDirection: 'row' }}>
                <TouchableOpacity style={styles.bomb4} onPress={() => password('#')}/>
                <TouchableOpacity style={styles.bomb4} onPress={() => password('0')}/>
                <TouchableOpacity style={styles.bomb4} onPress={() => password('#')} />
            </View>
        </View>
        


    return (


        <ImageBackground source={require('./src/img/C4.jpg')} style={styles.backGround}>

            <SafeAreaView style={styles.container}>
                <View>
                    {play === true ? relogioDefuse : senhaBomb}
                </View>
                <View>
                    {defusando === true ? defuse : null}
                    
                </View>
                <StatusBar style="auto" />
            </SafeAreaView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    backGround: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
        , alignItems: 'center'
    },
    input: {
        width: 300,
        height: 60,
        marginTop: 70,
        marginLeft: 40,
        backgroundColor: 'yellow',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,

    },
    bomb: {
        marginBottom: 1,
        
        marginLeft: 10,
        height: 55,
        width: 60,
        marginRight: 10,



    },
    bomb2: {
        marginBottom: 1,
        
        marginLeft: 10,
        height: 55,
        width: 60,
        marginRight: 10,



    },
    bomb3: {
        marginBottom: 10,
        
        marginLeft: 10,
        height: 55,
        width: 60,
        marginRight: 10,



    },
    bomb4: {
        marginBottom: 10,
        
        marginLeft: 10,
        height: 55,
        width: 60,
        marginRight: 10,



    }

});
