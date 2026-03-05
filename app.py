import streamlit as st
import pandas as pd
import json
import os

# --- CONFIGURATION DE LA PAGE ---
st.set_page_config(page_title="Molliet Lauper SA - Pronos WC2026", page_icon="⚽")

# --- STYLE PERSONNALISÉ (FOOTBALL) ---
st.markdown("""
    <style>
    .main {
        background-color: #f0f2f6;
    }
    .stButton>button {
        background-color: #004d99;
        color: white;
        border-radius: 10px;
    }
    </style>
    """, unsafe_allow_html=True)

# --- LOGO ET TITRE ---
# Remplace 'logo.png' par le chemin local ou l'URL de ton logo
# st.image("logo.png", width=200) 
st.title("🏆 Molliet Lauper SA : Pronostics 2026")
st.subheader("Faites vos jeux, soutenez votre équipe !")

# --- BASE DE DONNÉES SIMPLIFIÉE (JSON) ---
DATA_FILE = "pronostics.json"
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump([], f)

def save_prediction(name, match, score_home, score_away):
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    data.append({"Nom": name, "Match": match, "Score": f"{score_home}-{score_away}"})
    with open(DATA_FILE, "w") as f:
        json.dump(data, f)

# --- INTERFACE UTILISATEUR ---
tab1, tab2 = st.tabs(["⚽ Faire un Pronostic", "📊 Classement & Votes"])

with tab1:
    st.header("Dépose ton vote")
    
    with st.form("prono_form"):
        nom_collegue = st.text_input("Ton Prénom / Nom")
        match_choisi = st.selectbox("Choisir le match", [
            "États-Unis vs Mexique", 
            "Canada vs France", 
            "Suisse vs Brésil"
        ])
        
        col1, col2 = st.columns(2)
        with col1:
            score_h = st.number_input("Score Équipe A", min_value=0, step=1)
        with col2:
            score_a = st.number_input("Score Équipe B", min_value=0, step=1)
        
        submit = st.form_submit_button("Valider mon pronostic")
        
        if submit:
            if nom_collegue:
                save_prediction(nom_collegue, match_choisi, score_h, score_a)
                st.success(f"Merci {nom_collegue}, ton vote est enregistré !")
            else:
                st.error("N'oublie pas d'entrer ton nom !")

with tab2:
    st.header("Votes enregistrés")
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    
    if data:
        df = pd.DataFrame(data)
        st.table(df) # Affiche les votes de manière non anonyme
    else:
        st.info("Aucun vote pour le moment.")

# --- SECTION ADMIN (MOCKUP) ---
st.divider()
st.sidebar.title("Administration")
if st.sidebar.checkbox("Afficher la gestion des points"):
    st.sidebar.write("Ici, tu pourras entrer les résultats réels pour calculer les points automatiquement.")
