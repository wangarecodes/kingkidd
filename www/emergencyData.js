// Emergency Data - First Aid Guidelines

// Worldwide Emergency Numbers by Country
const worldwideEmergencyNumbers = {
    "AF": { country: "Afghanistan", police: "119", ambulance: "102", fire: "119", general: "119" },
    "AL": { country: "Albania", police: "129", ambulance: "127", fire: "128", general: "112" },
    "DZ": { country: "Algeria", police: "17", ambulance: "14", fire: "14", general: "17" },
    "AD": { country: "Andorra", police: "110", ambulance: "118", fire: "118", general: "112" },
    "AO": { country: "Angola", police: "113", ambulance: "112", fire: "115", general: "112" },
    "AR": { country: "Argentina", police: "101", ambulance: "107", fire: "100", general: "911" },
    "AM": { country: "Armenia", police: "102", ambulance: "103", fire: "101", general: "911" },
    "AU": { country: "Australia", police: "000", ambulance: "000", fire: "000", general: "000" },
    "AT": { country: "Austria", police: "133", ambulance: "144", fire: "122", general: "112" },
    "AZ": { country: "Azerbaijan", police: "102", ambulance: "103", fire: "101", general: "112" },
    "BS": { country: "Bahamas", police: "911", ambulance: "911", fire: "911", general: "911" },
    "BH": { country: "Bahrain", police: "999", ambulance: "999", fire: "999", general: "999" },
    "BD": { country: "Bangladesh", police: "999", ambulance: "999", fire: "999", general: "999" },
    "BB": { country: "Barbados", police: "211", ambulance: "511", fire: "311", general: "911" },
    "BY": { country: "Belarus", police: "102", ambulance: "103", fire: "101", general: "112" },
    "BE": { country: "Belgium", police: "101", ambulance: "100", fire: "100", general: "112" },
    "BZ": { country: "Belize", police: "911", ambulance: "911", fire: "911", general: "911" },
    "BJ": { country: "Benin", police: "117", ambulance: "118", fire: "118", general: "117" },
    "BT": { country: "Bhutan", police: "113", ambulance: "112", fire: "110", general: "112" },
    "BO": { country: "Bolivia", police: "110", ambulance: "118", fire: "119", general: "911" },
    "BA": { country: "Bosnia and Herzegovina", police: "122", ambulance: "124", fire: "123", general: "112" },
    "BW": { country: "Botswana", police: "999", ambulance: "997", fire: "998", general: "999" },
    "BR": { country: "Brazil", police: "190", ambulance: "192", fire: "193", general: "190" },
    "BN": { country: "Brunei", police: "993", ambulance: "991", fire: "995", general: "993" },
    "BG": { country: "Bulgaria", police: "166", ambulance: "150", fire: "160", general: "112" },
    "BF": { country: "Burkina Faso", police: "17", ambulance: "18", fire: "18", general: "17" },
    "BI": { country: "Burundi", police: "117", ambulance: "118", fire: "118", general: "117" },
    "KH": { country: "Cambodia", police: "117", ambulance: "119", fire: "118", general: "117" },
    "CM": { country: "Cameroon", police: "117", ambulance: "119", fire: "118", general: "117" },
    "CA": { country: "Canada", police: "911", ambulance: "911", fire: "911", general: "911" },
    "CV": { country: "Cape Verde", police: "132", ambulance: "130", fire: "131", general: "112" },
    "CF": { country: "Central African Republic", police: "117", ambulance: "118", fire: "118", general: "117" },
    "TD": { country: "Chad", police: "17", ambulance: "18", fire: "18", general: "17" },
    "CL": { country: "Chile", police: "133", ambulance: "131", fire: "132", general: "911" },
    "CN": { country: "China", police: "110", ambulance: "120", fire: "119", general: "110" },
    "CO": { country: "Colombia", police: "112", ambulance: "123", fire: "119", general: "123" },
    "KM": { country: "Comoros", police: "17", ambulance: "18", fire: "18", general: "17" },
    "CG": { country: "Congo", police: "117", ambulance: "118", fire: "118", general: "117" },
    "CD": { country: "DR Congo", police: "112", ambulance: "112", fire: "112", general: "112" },
    "CR": { country: "Costa Rica", police: "911", ambulance: "911", fire: "911", general: "911" },
    "HR": { country: "Croatia", police: "192", ambulance: "194", fire: "193", general: "112" },
    "CU": { country: "Cuba", police: "106", ambulance: "104", fire: "105", general: "106" },
    "CY": { country: "Cyprus", police: "112", ambulance: "112", fire: "112", general: "112" },
    "CZ": { country: "Czech Republic", police: "158", ambulance: "155", fire: "150", general: "112" },
    "DK": { country: "Denmark", police: "112", ambulance: "112", fire: "112", general: "112" },
    "DJ": { country: "Djibouti", police: "17", ambulance: "18", fire: "18", general: "17" },
    "DM": { country: "Dominica", police: "999", ambulance: "999", fire: "999", general: "999" },
    "DO": { country: "Dominican Republic", police: "911", ambulance: "911", fire: "911", general: "911" },
    "EC": { country: "Ecuador", police: "911", ambulance: "911", fire: "911", general: "911" },
    "EG": { country: "Egypt", police: "122", ambulance: "123", fire: "180", general: "122" },
    "SV": { country: "El Salvador", police: "911", ambulance: "911", fire: "911", general: "911" },
    "GQ": { country: "Equatorial Guinea", police: "117", ambulance: "118", fire: "118", general: "117" },
    "ER": { country: "Eritrea", police: "113", ambulance: "114", fire: "115", general: "113" },
    "EE": { country: "Estonia", police: "110", ambulance: "112", fire: "112", general: "112" },
    "SZ": { country: "Eswatini", police: "999", ambulance: "977", fire: "933", general: "999" },
    "ET": { country: "Ethiopia", police: "991", ambulance: "907", fire: "939", general: "991" },
    "FJ": { country: "Fiji", police: "911", ambulance: "911", fire: "911", general: "911" },
    "FI": { country: "Finland", police: "112", ambulance: "112", fire: "112", general: "112" },
    "FR": { country: "France", police: "17", ambulance: "15", fire: "18", general: "112" },
    "GA": { country: "Gabon", police: "1730", ambulance: "1300", fire: "18", general: "1730" },
    "GM": { country: "Gambia", police: "117", ambulance: "116", fire: "118", general: "117" },
    "GE": { country: "Georgia", police: "112", ambulance: "112", fire: "112", general: "112" },
    "DE": { country: "Germany", police: "110", ambulance: "112", fire: "112", general: "112" },
    "GH": { country: "Ghana", police: "191", ambulance: "193", fire: "192", general: "999" },
    "GR": { country: "Greece", police: "100", ambulance: "166", fire: "199", general: "112" },
    "GD": { country: "Grenada", police: "911", ambulance: "911", fire: "911", general: "911" },
    "GT": { country: "Guatemala", police: "110", ambulance: "128", fire: "122", general: "911" },
    "GN": { country: "Guinea", police: "117", ambulance: "118", fire: "118", general: "117" },
    "GW": { country: "Guinea-Bissau", police: "117", ambulance: "118", fire: "118", general: "117" },
    "GY": { country: "Guyana", police: "911", ambulance: "913", fire: "912", general: "911" },
    "HT": { country: "Haiti", police: "114", ambulance: "118", fire: "115", general: "114" },
    "HN": { country: "Honduras", police: "199", ambulance: "195", fire: "198", general: "911" },
    "HK": { country: "Hong Kong", police: "999", ambulance: "999", fire: "999", general: "999" },
    "HU": { country: "Hungary", police: "107", ambulance: "104", fire: "105", general: "112" },
    "IS": { country: "Iceland", police: "112", ambulance: "112", fire: "112", general: "112" },
    "IN": { country: "India", police: "100", ambulance: "102", fire: "101", general: "112" },
    "ID": { country: "Indonesia", police: "110", ambulance: "118", fire: "113", general: "112" },
    "IR": { country: "Iran", police: "110", ambulance: "115", fire: "125", general: "110" },
    "IQ": { country: "Iraq", police: "104", ambulance: "122", fire: "115", general: "104" },
    "IE": { country: "Ireland", police: "112", ambulance: "112", fire: "112", general: "112" },
    "IL": { country: "Israel", police: "100", ambulance: "101", fire: "102", general: "100" },
    "IT": { country: "Italy", police: "113", ambulance: "118", fire: "115", general: "112" },
    "CI": { country: "Ivory Coast", police: "111", ambulance: "185", fire: "180", general: "111" },
    "JM": { country: "Jamaica", police: "119", ambulance: "110", fire: "110", general: "119" },
    "JP": { country: "Japan", police: "110", ambulance: "119", fire: "119", general: "110" },
    "JO": { country: "Jordan", police: "911", ambulance: "911", fire: "911", general: "911" },
    "KZ": { country: "Kazakhstan", police: "102", ambulance: "103", fire: "101", general: "112" },
    "KE": { country: "Kenya", police: "999", ambulance: "999", fire: "999", general: "999" },
    "KI": { country: "Kiribati", police: "992", ambulance: "994", fire: "993", general: "992" },
    "KP": { country: "North Korea", police: "119", ambulance: "119", fire: "119", general: "119" },
    "KR": { country: "South Korea", police: "112", ambulance: "119", fire: "119", general: "112" },
    "KW": { country: "Kuwait", police: "112", ambulance: "112", fire: "112", general: "112" },
    "KG": { country: "Kyrgyzstan", police: "102", ambulance: "103", fire: "101", general: "112" },
    "LA": { country: "Laos", police: "191", ambulance: "195", fire: "190", general: "191" },
    "LV": { country: "Latvia", police: "110", ambulance: "113", fire: "112", general: "112" },
    "LB": { country: "Lebanon", police: "112", ambulance: "140", fire: "175", general: "112" },
    "LS": { country: "Lesotho", police: "123", ambulance: "121", fire: "122", general: "123" },
    "LR": { country: "Liberia", police: "911", ambulance: "911", fire: "911", general: "911" },
    "LY": { country: "Libya", police: "1515", ambulance: "193", fire: "180", general: "1515" },
    "LI": { country: "Liechtenstein", police: "117", ambulance: "144", fire: "118", general: "112" },
    "LT": { country: "Lithuania", police: "112", ambulance: "112", fire: "112", general: "112" },
    "LU": { country: "Luxembourg", police: "113", ambulance: "112", fire: "112", general: "112" },
    "MO": { country: "Macau", police: "999", ambulance: "999", fire: "999", general: "999" },
    "MK": { country: "North Macedonia", police: "192", ambulance: "194", fire: "193", general: "112" },
    "MG": { country: "Madagascar", police: "117", ambulance: "118", fire: "118", general: "117" },
    "MW": { country: "Malawi", police: "997", ambulance: "998", fire: "999", general: "997" },
    "MY": { country: "Malaysia", police: "999", ambulance: "999", fire: "994", general: "999" },
    "MV": { country: "Maldives", police: "119", ambulance: "102", fire: "118", general: "119" },
    "ML": { country: "Mali", police: "17", ambulance: "15", fire: "18", general: "17" },
    "MT": { country: "Malta", police: "112", ambulance: "112", fire: "112", general: "112" },
    "MH": { country: "Marshall Islands", police: "911", ambulance: "911", fire: "911", general: "911" },
    "MR": { country: "Mauritania", police: "117", ambulance: "118", fire: "118", general: "117" },
    "MU": { country: "Mauritius", police: "999", ambulance: "114", fire: "115", general: "999" },
    "MX": { country: "Mexico", police: "911", ambulance: "911", fire: "911", general: "911" },
    "FM": { country: "Micronesia", police: "911", ambulance: "911", fire: "911", general: "911" },
    "MD": { country: "Moldova", police: "902", ambulance: "903", fire: "901", general: "112" },
    "MC": { country: "Monaco", police: "17", ambulance: "18", fire: "18", general: "112" },
    "MN": { country: "Mongolia", police: "102", ambulance: "103", fire: "101", general: "102" },
    "ME": { country: "Montenegro", police: "122", ambulance: "124", fire: "123", general: "112" },
    "MA": { country: "Morocco", police: "19", ambulance: "15", fire: "15", general: "19" },
    "MZ": { country: "Mozambique", police: "119", ambulance: "117", fire: "198", general: "119" },
    "MM": { country: "Myanmar", police: "199", ambulance: "192", fire: "191", general: "199" },
    "NA": { country: "Namibia", police: "10111", ambulance: "211111", fire: "2032270", general: "10111" },
    "NR": { country: "Nauru", police: "110", ambulance: "111", fire: "112", general: "110" },
    "NP": { country: "Nepal", police: "100", ambulance: "102", fire: "101", general: "100" },
    "NL": { country: "Netherlands", police: "112", ambulance: "112", fire: "112", general: "112" },
    "NZ": { country: "New Zealand", police: "111", ambulance: "111", fire: "111", general: "111" },
    "NI": { country: "Nicaragua", police: "118", ambulance: "128", fire: "115", general: "911" },
    "NE": { country: "Niger", police: "17", ambulance: "18", fire: "18", general: "17" },
    "NG": { country: "Nigeria", police: "199", ambulance: "199", fire: "199", general: "112" },
    "NO": { country: "Norway", police: "112", ambulance: "113", fire: "110", general: "112" },
    "OM": { country: "Oman", police: "9999", ambulance: "9999", fire: "9999", general: "9999" },
    "PK": { country: "Pakistan", police: "15", ambulance: "115", fire: "16", general: "15" },
    "PW": { country: "Palau", police: "911", ambulance: "911", fire: "911", general: "911" },
    "PS": { country: "Palestine", police: "100", ambulance: "101", fire: "102", general: "100" },
    "PA": { country: "Panama", police: "104", ambulance: "911", fire: "103", general: "911" },
    "PG": { country: "Papua New Guinea", police: "112", ambulance: "111", fire: "110", general: "112" },
    "PY": { country: "Paraguay", police: "911", ambulance: "911", fire: "911", general: "911" },
    "PE": { country: "Peru", police: "105", ambulance: "117", fire: "116", general: "911" },
    "PH": { country: "Philippines", police: "911", ambulance: "911", fire: "911", general: "911" },
    "PL": { country: "Poland", police: "997", ambulance: "999", fire: "998", general: "112" },
    "PT": { country: "Portugal", police: "112", ambulance: "112", fire: "112", general: "112" },
    "QA": { country: "Qatar", police: "999", ambulance: "999", fire: "999", general: "999" },
    "RO": { country: "Romania", police: "112", ambulance: "112", fire: "112", general: "112" },
    "RU": { country: "Russia", police: "102", ambulance: "103", fire: "101", general: "112" },
    "RW": { country: "Rwanda", police: "112", ambulance: "912", fire: "111", general: "112" },
    "KN": { country: "Saint Kitts and Nevis", police: "911", ambulance: "911", fire: "911", general: "911" },
    "LC": { country: "Saint Lucia", police: "999", ambulance: "911", fire: "911", general: "911" },
    "VC": { country: "Saint Vincent", police: "911", ambulance: "911", fire: "911", general: "911" },
    "WS": { country: "Samoa", police: "995", ambulance: "996", fire: "994", general: "995" },
    "SM": { country: "San Marino", police: "113", ambulance: "118", fire: "115", general: "112" },
    "ST": { country: "Sao Tome and Principe", police: "112", ambulance: "112", fire: "112", general: "112" },
    "SA": { country: "Saudi Arabia", police: "999", ambulance: "997", fire: "998", general: "911" },
    "SN": { country: "Senegal", police: "17", ambulance: "18", fire: "18", general: "17" },
    "RS": { country: "Serbia", police: "192", ambulance: "194", fire: "193", general: "112" },
    "SC": { country: "Seychelles", police: "999", ambulance: "151", fire: "999", general: "999" },
    "SL": { country: "Sierra Leone", police: "019", ambulance: "999", fire: "019", general: "999" },
    "SG": { country: "Singapore", police: "999", ambulance: "995", fire: "995", general: "999" },
    "SK": { country: "Slovakia", police: "158", ambulance: "155", fire: "150", general: "112" },
    "SI": { country: "Slovenia", police: "113", ambulance: "112", fire: "112", general: "112" },
    "SB": { country: "Solomon Islands", police: "999", ambulance: "911", fire: "988", general: "999" },
    "SO": { country: "Somalia", police: "888", ambulance: "999", fire: "555", general: "888" },
    "ZA": { country: "South Africa", police: "10111", ambulance: "10177", fire: "10177", general: "112" },
    "SS": { country: "South Sudan", police: "999", ambulance: "999", fire: "999", general: "999" },
    "ES": { country: "Spain", police: "091", ambulance: "061", fire: "080", general: "112" },
    "LK": { country: "Sri Lanka", police: "119", ambulance: "110", fire: "111", general: "119" },
    "SD": { country: "Sudan", police: "999", ambulance: "999", fire: "999", general: "999" },
    "SR": { country: "Suriname", police: "115", ambulance: "113", fire: "110", general: "115" },
    "SE": { country: "Sweden", police: "112", ambulance: "112", fire: "112", general: "112" },
    "CH": { country: "Switzerland", police: "117", ambulance: "144", fire: "118", general: "112" },
    "SY": { country: "Syria", police: "112", ambulance: "110", fire: "113", general: "112" },
    "TW": { country: "Taiwan", police: "110", ambulance: "119", fire: "119", general: "110" },
    "TJ": { country: "Tajikistan", police: "102", ambulance: "103", fire: "101", general: "112" },
    "TZ": { country: "Tanzania", police: "112", ambulance: "114", fire: "115", general: "112" },
    "TH": { country: "Thailand", police: "191", ambulance: "1669", fire: "199", general: "191" },
    "TL": { country: "Timor-Leste", police: "112", ambulance: "112", fire: "112", general: "112" },
    "TG": { country: "Togo", police: "117", ambulance: "118", fire: "118", general: "117" },
    "TO": { country: "Tonga", police: "922", ambulance: "933", fire: "999", general: "911" },
    "TT": { country: "Trinidad and Tobago", police: "999", ambulance: "990", fire: "990", general: "999" },
    "TN": { country: "Tunisia", police: "197", ambulance: "190", fire: "198", general: "197" },
    "TR": { country: "Turkey", police: "155", ambulance: "112", fire: "110", general: "112" },
    "TM": { country: "Turkmenistan", police: "102", ambulance: "103", fire: "101", general: "112" },
    "TV": { country: "Tuvalu", police: "911", ambulance: "911", fire: "911", general: "911" },
    "UG": { country: "Uganda", police: "999", ambulance: "911", fire: "999", general: "112" },
    "UA": { country: "Ukraine", police: "102", ambulance: "103", fire: "101", general: "112" },
    "AE": { country: "United Arab Emirates", police: "999", ambulance: "998", fire: "997", general: "999" },
    "GB": { country: "United Kingdom", police: "999", ambulance: "999", fire: "999", general: "999" },
    "US": { country: "United States", police: "911", ambulance: "911", fire: "911", general: "911" },
    "UY": { country: "Uruguay", police: "911", ambulance: "911", fire: "911", general: "911" },
    "UZ": { country: "Uzbekistan", police: "102", ambulance: "103", fire: "101", general: "112" },
    "VU": { country: "Vanuatu", police: "112", ambulance: "112", fire: "112", general: "112" },
    "VA": { country: "Vatican City", police: "112", ambulance: "112", fire: "112", general: "112" },
    "VE": { country: "Venezuela", police: "171", ambulance: "171", fire: "171", general: "911" },
    "VN": { country: "Vietnam", police: "113", ambulance: "115", fire: "114", general: "113" },
    "YE": { country: "Yemen", police: "199", ambulance: "191", fire: "191", general: "199" },
    "ZM": { country: "Zambia", police: "999", ambulance: "991", fire: "993", general: "999" },
    "ZW": { country: "Zimbabwe", police: "995", ambulance: "994", fire: "993", general: "999" }
};

// Medical Facility Types for Search
const medicalFacilityTypes = [
    { type: 'hospital', icon: 'fa-hospital', name: 'Hospital' },
    { type: 'pharmacy', icon: 'fa-pills', name: 'Pharmacy' },
    { type: 'doctor', icon: 'fa-user-md', name: 'Doctor/Clinic' },
    { type: 'dentist', icon: 'fa-tooth', name: 'Dentist' },
    { type: 'veterinary_care', icon: 'fa-paw', name: 'Veterinary' }
];

const emergencyData = {
    categories: [
        {
            id: 'cardiac',
            name: 'Cardiac Arrest / CPR',
            icon: 'fa-heartbeat',
            class: 'cardiac',
            severity: 'high',
            keywords: ['heart attack', 'cardiac', 'cpr', 'heart', 'chest pain', 'no pulse', 'not breathing']
        },
        {
            id: 'breathing',
            name: 'Breathing Problems',
            icon: 'fa-lungs',
            class: 'breathing',
            severity: 'high',
            keywords: ['breathing', 'asthma', 'breath', 'suffocation', 'respiratory', 'cant breathe']
        },
        {
            id: 'bleeding',
            name: 'Severe Bleeding',
            icon: 'fa-tint',
            class: 'bleeding',
            severity: 'high',
            keywords: ['bleeding', 'blood', 'wound', 'cut', 'hemorrhage', 'laceration']
        },
        {
            id: 'burns',
            name: 'Burns',
            icon: 'fa-fire-alt',
            class: 'burns',
            severity: 'medium',
            keywords: ['burn', 'fire', 'scald', 'hot water', 'chemical burn', 'thermal']
        },
        {
            id: 'fractures',
            name: 'Fractures & Sprains',
            icon: 'fa-bone',
            class: 'fractures',
            severity: 'medium',
            keywords: ['fracture', 'broken bone', 'sprain', 'dislocation', 'injury', 'fall']
        },
        {
            id: 'choking',
            name: 'Choking',
            icon: 'fa-hand-paper',
            class: 'choking',
            severity: 'high',
            keywords: ['choking', 'heimlich', 'airway obstruction', 'cant swallow', 'food stuck']
        },
        {
            id: 'poisoning',
            name: 'Poisoning',
            icon: 'fa-skull-crossbones',
            class: 'poisoning',
            severity: 'high',
            keywords: ['poison', 'overdose', 'toxic', 'ingestion', 'chemical', 'drug']
        },
        {
            id: 'allergic',
            name: 'Allergic Reactions',
            icon: 'fa-allergies',
            class: 'allergic',
            severity: 'high',
            keywords: ['allergic', 'anaphylaxis', 'allergy', 'swelling', 'hives', 'epipen']
        },
        {
            id: 'stroke',
            name: 'Stroke',
            icon: 'fa-brain',
            class: 'stroke',
            severity: 'high',
            keywords: ['stroke', 'brain', 'paralysis', 'face drooping', 'slurred speech', 'fast']
        },
        {
            id: 'seizure',
            name: 'Seizures',
            icon: 'fa-bolt',
            class: 'seizure',
            severity: 'high',
            keywords: ['seizure', 'epilepsy', 'convulsion', 'fit', 'unconscious']
        },
        {
            id: 'drowning',
            name: 'Drowning',
            icon: 'fa-water',
            class: 'drowning',
            severity: 'high',
            keywords: ['drowning', 'water', 'swimming', 'submersion', 'pool']
        },
        {
            id: 'electric',
            name: 'Electric Shock',
            icon: 'fa-bolt',
            class: 'electric',
            severity: 'high',
            keywords: ['electric', 'shock', 'electrocution', 'lightning', 'current']
        },
        {
            id: 'animal',
            name: 'Animal Bites',
            icon: 'fa-paw',
            class: 'animal',
            severity: 'medium',
            keywords: ['bite', 'animal', 'dog', 'snake', 'insect', 'sting', 'rabies']
        },
        {
            id: 'heat',
            name: 'Heat Emergencies',
            icon: 'fa-temperature-high',
            class: 'heat',
            severity: 'medium',
            keywords: ['heat', 'sunstroke', 'heatstroke', 'dehydration', 'hot', 'fever']
        },
        {
            id: 'cold',
            name: 'Cold Emergencies',
            icon: 'fa-snowflake',
            class: 'cold',
            severity: 'medium',
            keywords: ['cold', 'hypothermia', 'frostbite', 'freezing', 'exposure']
        },
        {
            id: 'pregnancy',
            name: 'Pregnancy Emergency',
            icon: 'fa-baby',
            class: 'pregnancy',
            severity: 'high',
            keywords: ['pregnancy', 'labor', 'delivery', 'birth', 'contractions', 'pregnant']
        }
    ],

    guides: {
        cardiac: {
            title: 'Cardiac Arrest / CPR',
            icon: 'fa-heartbeat',
            severity: 'high',
            warning: 'Call 911 immediately! Time is critical. Begin CPR as soon as possible.',
            steps: [
                {
                    title: 'Check Responsiveness',
                    description: 'Tap the person\'s shoulder firmly and shout "Are you okay?" Look for signs of breathing or movement.'
                },
                {
                    title: 'Call for Help',
                    description: 'If unresponsive, call 911 immediately or ask someone nearby to call. Request an AED (Automated External Defibrillator) if available.'
                },
                {
                    title: 'Position the Person',
                    description: 'Place the person on their back on a firm, flat surface. Kneel beside their chest.'
                },
                {
                    title: 'Begin Chest Compressions',
                    description: 'Place the heel of one hand on the center of the chest (lower half of breastbone). Place your other hand on top, interlocking fingers. Push hard and fast - at least 2 inches deep, 100-120 compressions per minute.'
                },
                {
                    title: 'Give Rescue Breaths (if trained)',
                    description: 'After 30 compressions, tilt the head back, lift the chin, pinch the nose, and give 2 breaths. Each breath should last about 1 second and make the chest rise.'
                },
                {
                    title: 'Continue CPR',
                    description: 'Continue cycles of 30 compressions and 2 breaths. Don\'t stop until emergency help arrives, an AED is available, or the person starts breathing.'
                },
                {
                    title: 'Use AED if Available',
                    description: 'Turn on the AED and follow voice prompts. Attach pads to bare chest as shown. Stand clear when the device analyzes and delivers shocks.'
                }
            ],
            dontDo: [
                'Don\'t delay starting CPR - every minute counts',
                'Don\'t give up too early - continue until help arrives',
                'Don\'t compress too shallow - push hard',
                'Don\'t interrupt compressions for more than 10 seconds',
                'Don\'t place hands on the ribs or lower tip of breastbone'
            ]
        },

        breathing: {
            title: 'Breathing Problems',
            icon: 'fa-lungs',
            severity: 'high',
            warning: 'Breathing emergencies can be life-threatening. Stay calm and act quickly.',
            steps: [
                {
                    title: 'Assess the Situation',
                    description: 'Check if the person is conscious, the severity of breathing difficulty, and look for signs like blue lips, wheezing, or gasping.'
                },
                {
                    title: 'Call Emergency Services',
                    description: 'If breathing is severely compromised, call 911 immediately. Describe the symptoms clearly.'
                },
                {
                    title: 'Help Them Sit Up',
                    description: 'Help the person sit in an upright position, slightly leaning forward. This position makes breathing easier.'
                },
                {
                    title: 'Loosen Tight Clothing',
                    description: 'Remove or loosen any tight clothing around the neck and chest that might restrict breathing.'
                },
                {
                    title: 'Check for Asthma Medication',
                    description: 'If the person has asthma, help them use their prescribed inhaler. Shake the inhaler, have them exhale, then inhale the medication slowly.'
                },
                {
                    title: 'Keep Them Calm',
                    description: 'Encourage slow, deep breaths. Panic worsens breathing problems. Speak calmly and reassuringly.'
                },
                {
                    title: 'Monitor and Wait',
                    description: 'Stay with the person, monitor their breathing, and be ready to perform CPR if they stop breathing.'
                }
            ],
            dontDo: [
                'Don\'t leave the person alone',
                'Don\'t give them food or water while struggling to breathe',
                'Don\'t make them lie flat - keep them upright',
                'Don\'t panic or convey anxiety',
                'Don\'t give someone else\'s medication'
            ]
        },

        bleeding: {
            title: 'Severe Bleeding',
            icon: 'fa-tint',
            severity: 'high',
            warning: 'Severe bleeding can be life-threatening within minutes. Apply direct pressure immediately.',
            steps: [
                {
                    title: 'Ensure Your Safety',
                    description: 'If possible, wear gloves or use a barrier to protect yourself from blood contact. Wash hands before and after.'
                },
                {
                    title: 'Apply Direct Pressure',
                    description: 'Press firmly on the wound with a clean cloth, bandage, or clothing. Use your palm for large wounds.'
                },
                {
                    title: 'Don\'t Remove the Cloth',
                    description: 'If blood soaks through, add more layers on top. Removing the cloth disrupts clot formation.'
                },
                {
                    title: 'Elevate if Possible',
                    description: 'If there\'s no suspected broken bone, raise the injured limb above heart level to slow bleeding.'
                },
                {
                    title: 'Apply Pressure to Pressure Points',
                    description: 'If bleeding continues, apply pressure to the artery between the wound and heart (arm: inside upper arm; leg: groin area).'
                },
                {
                    title: 'Use a Tourniquet (Last Resort)',
                    description: 'Only for life-threatening limb bleeding when direct pressure fails. Apply 2-3 inches above the wound, tighten until bleeding stops. Note the time.'
                },
                {
                    title: 'Treat for Shock',
                    description: 'Keep the person lying down, warm, and calm. Don\'t give food or drink. Monitor breathing and consciousness.'
                }
            ],
            dontDo: [
                'Don\'t remove objects embedded in the wound',
                'Don\'t apply tourniquet to head, neck, or torso',
                'Don\'t use a tourniquet unless absolutely necessary',
                'Don\'t give aspirin (increases bleeding)',
                'Don\'t wash severe wounds - focus on stopping bleeding'
            ]
        },

        burns: {
            title: 'Burns',
            icon: 'fa-fire-alt',
            severity: 'medium',
            warning: 'For severe burns (large area, face, hands, genitals), call 911 immediately.',
            steps: [
                {
                    title: 'Stop the Burning Process',
                    description: 'Remove the person from the heat source. If clothing is on fire: Stop, Drop, and Roll. Remove smoldering clothing unless stuck to skin.'
                },
                {
                    title: 'Cool the Burn',
                    description: 'Run cool (not cold) water over the burn for 10-20 minutes. This reduces pain, swelling, and depth of injury.'
                },
                {
                    title: 'Remove Jewelry & Tight Items',
                    description: 'Gently remove rings, watches, and tight clothing near the burn before swelling starts.'
                },
                {
                    title: 'Cover the Burn',
                    description: 'After cooling, cover with a sterile, non-stick bandage or clean cloth. Don\'t apply cotton balls that can stick.'
                },
                {
                    title: 'Don\'t Apply Home Remedies',
                    description: 'Avoid butter, oil, toothpaste, or ice - these can damage tissue and increase infection risk.'
                },
                {
                    title: 'Take Pain Relief',
                    description: 'Over-the-counter pain relievers like ibuprofen can help with pain and inflammation.'
                },
                {
                    title: 'Seek Medical Care',
                    description: 'Get medical help for burns larger than 3 inches, on face/hands/feet/joints/genitals, deep burns, or chemical/electrical burns.'
                }
            ],
            dontDo: [
                'Don\'t apply ice - it can cause frostbite on damaged skin',
                'Don\'t use butter, oil, or other home remedies',
                'Don\'t break blisters - they protect against infection',
                'Don\'t remove clothing stuck to the burn',
                'Don\'t use fluffy cotton - fibers can stick to the wound'
            ]
        },

        fractures: {
            title: 'Fractures & Sprains',
            icon: 'fa-bone',
            severity: 'medium',
            warning: 'Don\'t move someone with a suspected spinal injury. Call 911 for severe injuries.',
            steps: [
                {
                    title: 'Assess the Injury',
                    description: 'Look for swelling, deformity, bruising, inability to move the limb, and severe pain. Compare to the uninjured side.'
                },
                {
                    title: 'Immobilize the Injury',
                    description: 'Keep the injured area still. Don\'t try to straighten or realign bones. Support in the position found.'
                },
                {
                    title: 'Apply Ice Pack',
                    description: 'Wrap ice in cloth and apply for 15-20 minutes at a time. This reduces swelling and pain.'
                },
                {
                    title: 'Elevate if Possible',
                    description: 'Raise the injured limb above heart level to reduce swelling, if this doesn\'t cause more pain.'
                },
                {
                    title: 'Create a Splint',
                    description: 'Use rigid materials (boards, magazines) padded with soft cloth. Secure with bandages above and below the injury. Don\'t wrap too tight.'
                },
                {
                    title: 'Check Circulation',
                    description: 'Ensure fingers/toes beyond the injury are warm, pink, and can move. Loosen splint if numbness, tingling, or color change occurs.'
                },
                {
                    title: 'Seek Medical Care',
                    description: 'All suspected fractures need X-rays. Go to emergency room for severe pain, obvious deformity, or open wounds over the fracture.'
                }
            ],
            dontDo: [
                'Don\'t try to straighten a broken bone',
                'Don\'t move someone with suspected spinal injury',
                'Don\'t apply ice directly to skin',
                'Don\'t wrap splints too tightly',
                'Don\'t let the person walk on a potentially broken leg/ankle'
            ]
        },

        choking: {
            title: 'Choking',
            icon: 'fa-hand-paper',
            severity: 'high',
            warning: 'A person who can\'t speak, cough forcefully, or breathe needs immediate help.',
            steps: [
                {
                    title: 'Identify Severe Choking',
                    description: 'Signs include: inability to talk, weak or no cough, difficulty breathing, skin turning blue, hands clutching throat (universal choking sign).'
                },
                {
                    title: 'Call 911',
                    description: 'Have someone call emergency services while you begin first aid.'
                },
                {
                    title: 'Perform Back Blows',
                    description: 'Stand behind the person, lean them forward. Give 5 firm back blows between shoulder blades with the heel of your hand.'
                },
                {
                    title: 'Perform Abdominal Thrusts (Heimlich)',
                    description: 'Stand behind the person, wrap arms around waist. Make a fist, place thumb side against upper abdomen (above navel, below ribs). Grasp fist with other hand, thrust inward and upward firmly.'
                },
                {
                    title: 'Alternate Techniques',
                    description: 'Continue alternating 5 back blows and 5 abdominal thrusts until object is expelled or person becomes unconscious.'
                },
                {
                    title: 'If Person Becomes Unconscious',
                    description: 'Lower them to the ground, call 911 if not done. Begin CPR - look for object in mouth before giving breaths, remove only if visible.'
                },
                {
                    title: 'For Infants (under 1 year)',
                    description: 'Hold infant face-down on forearm, support head. Give 5 back blows. Turn over, give 5 chest thrusts using 2 fingers on breastbone. Repeat.'
                }
            ],
            dontDo: [
                'Don\'t do abdominal thrusts on pregnant women or obese persons - use chest thrusts instead',
                'Don\'t perform blind finger sweeps - you may push object deeper',
                'Don\'t slap a choking person on the back while they\'re upright',
                'Don\'t give up - continue until help arrives',
                'Don\'t do abdominal thrusts on infants - use back blows and chest thrusts'
            ]
        },

        poisoning: {
            title: 'Poisoning',
            icon: 'fa-skull-crossbones',
            severity: 'high',
            warning: 'Call Poison Control (1-800-222-1222) or 911 immediately. Don\'t induce vomiting unless instructed.',
            steps: [
                {
                    title: 'Call Poison Control',
                    description: 'Call 1-800-222-1222 immediately. Have the container/substance ready to describe. Follow their instructions exactly.'
                },
                {
                    title: 'Gather Information',
                    description: 'Note what was taken, how much, when, the person\'s age, weight, and current symptoms. Save any containers or samples.'
                },
                {
                    title: 'Check for Symptoms',
                    description: 'Watch for: nausea/vomiting, confusion, drowsiness, difficulty breathing, burns around mouth, unusual breath odor, seizures.'
                },
                {
                    title: 'If Conscious and Alert',
                    description: 'Don\'t induce vomiting unless told by Poison Control. Give small sips of water if they can swallow safely.'
                },
                {
                    title: 'If Unconscious',
                    description: 'Call 911. Place in recovery position (on side) to prevent choking on vomit. Be ready to perform CPR if needed.'
                },
                {
                    title: 'For Skin Contact',
                    description: 'Remove contaminated clothing. Rinse skin with large amounts of water for 15-20 minutes.'
                },
                {
                    title: 'For Eye Contact',
                    description: 'Rinse eyes with clean lukewarm water for 15-20 minutes. Remove contact lenses. Keep eyelids open while rinsing.'
                }
            ],
            dontDo: [
                'Don\'t induce vomiting unless instructed by professionals',
                'Don\'t give ipecac syrup',
                'Don\'t give anything by mouth if person is unconscious',
                'Don\'t wait for symptoms to appear - call immediately',
                'Don\'t try to neutralize poison with other substances'
            ]
        },

        allergic: {
            title: 'Severe Allergic Reaction (Anaphylaxis)',
            icon: 'fa-allergies',
            severity: 'high',
            warning: 'Anaphylaxis is life-threatening! Use epinephrine immediately and call 911.',
            steps: [
                {
                    title: 'Recognize Anaphylaxis',
                    description: 'Symptoms: difficulty breathing, swelling of throat/tongue, hives, dizziness, rapid pulse, nausea, loss of consciousness.'
                },
                {
                    title: 'Call 911 Immediately',
                    description: 'Anaphylaxis can progress rapidly. Emergency medical care is essential even if symptoms seem to improve.'
                },
                {
                    title: 'Use Epinephrine Auto-Injector',
                    description: 'If available (EpiPen), inject into outer thigh immediately. Can be given through clothing. Hold for 10 seconds. Note the time.'
                },
                {
                    title: 'Position the Person',
                    description: 'If having trouble breathing: sit them up. If dizzy/faint: lay them down with legs elevated. If vomiting: place on side.'
                },
                {
                    title: 'Remove the Allergen',
                    description: 'If stinger present, scrape it off with a flat edge (credit card). Remove any remaining allergen source if possible.'
                },
                {
                    title: 'Give a Second Dose if Needed',
                    description: 'If symptoms don\'t improve in 5-15 minutes, give a second epinephrine injection on the other thigh.'
                },
                {
                    title: 'Be Ready for CPR',
                    description: 'Monitor breathing and pulse. Be prepared to perform CPR if the person stops breathing or loses pulse.'
                }
            ],
            dontDo: [
                'Don\'t delay using epinephrine',
                'Don\'t rely only on antihistamines for severe reactions',
                'Don\'t make the person walk - keep them still',
                'Don\'t leave them alone',
                'Don\'t assume they\'re fine after epinephrine - still need ER'
            ]
        },

        stroke: {
            title: 'Stroke',
            icon: 'fa-brain',
            severity: 'high',
            warning: 'Time is brain! Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911.',
            steps: [
                {
                    title: 'Use FAST Method',
                    description: 'F - Face: Ask them to smile. Is one side drooping? A - Arms: Ask them to raise both arms. Does one drift down? S - Speech: Ask them to repeat a simple phrase. Is speech slurred? T - Time: Call 911 immediately if any signs present.'
                },
                {
                    title: 'Note the Time',
                    description: 'Record when symptoms first appeared. This is critical for treatment decisions. Some treatments must be given within hours.'
                },
                {
                    title: 'Call 911 Immediately',
                    description: 'Don\'t drive to the hospital yourself. Paramedics can start treatment and alert the hospital.'
                },
                {
                    title: 'Keep Them Comfortable',
                    description: 'Help them lie down with head and shoulders slightly raised. Loosen any tight clothing. Keep them calm.'
                },
                {
                    title: 'Don\'t Give Food or Drink',
                    description: 'Stroke can affect swallowing. Giving food or water could cause choking.'
                },
                {
                    title: 'Monitor Breathing',
                    description: 'If unconscious, check airway and breathing. Place in recovery position if breathing. Be ready for CPR.'
                },
                {
                    title: 'Gather Information',
                    description: 'Note all medications they take, especially blood thinners. Have their medical history ready for paramedics.'
                }
            ],
            dontDo: [
                'Don\'t delay calling 911 - every minute counts',
                'Don\'t give aspirin unless instructed by 911',
                'Don\'t give food or water',
                'Don\'t let them fall asleep without monitoring',
                'Don\'t dismiss mild symptoms - mini-strokes are warnings'
            ]
        },

        seizure: {
            title: 'Seizures',
            icon: 'fa-bolt',
            severity: 'high',
            warning: 'Most seizures end on their own. Call 911 if seizure lasts more than 5 minutes.',
            steps: [
                {
                    title: 'Keep Calm and Time It',
                    description: 'Note when the seizure starts. Most seizures last 30 seconds to 2 minutes. Stay calm and speak reassuringly.'
                },
                {
                    title: 'Clear the Area',
                    description: 'Move furniture and sharp objects away. Create space around the person to prevent injury during convulsions.'
                },
                {
                    title: 'Protect the Head',
                    description: 'Place something soft under their head - a jacket, pillow, or your hands. Don\'t restrain their movements.'
                },
                {
                    title: 'Don\'t Put Anything in Mouth',
                    description: 'The old myth about swallowing the tongue is false. Objects in the mouth can cause injury or choking.'
                },
                {
                    title: 'Turn Them on Their Side',
                    description: 'Once convulsions stop, gently turn them onto their side (recovery position). This helps keep the airway clear.'
                },
                {
                    title: 'Stay Until Fully Recovered',
                    description: 'After the seizure, they may be confused or sleepy. Stay with them, speak calmly, and help them reorient.'
                },
                {
                    title: 'Call 911 If',
                    description: 'Seizure lasts more than 5 minutes, person doesn\'t regain consciousness, another seizure follows, person is pregnant, has diabetes, is injured, or this is their first seizure.'
                }
            ],
            dontDo: [
                'Don\'t put anything in their mouth',
                'Don\'t restrain or hold them down',
                'Don\'t give water or food until fully alert',
                'Don\'t leave them alone',
                'Don\'t panic - most seizures end on their own'
            ]
        },

        drowning: {
            title: 'Drowning',
            icon: 'fa-water',
            severity: 'high',
            warning: 'Get help immediately! Don\'t attempt rescue beyond your ability - many rescuers drown.',
            steps: [
                {
                    title: 'Call for Help',
                    description: 'Shout for help and call 911 immediately. If a lifeguard is present, alert them first.'
                },
                {
                    title: 'Reach and Throw, Don\'t Go',
                    description: 'Try to reach with a pole, branch, or rope first. Throw a flotation device. Only enter water if trained and as last resort.'
                },
                {
                    title: 'Get Them to Safety',
                    description: 'Once out of water, check responsiveness. Tap shoulders and shout. Look, listen, and feel for breathing.'
                },
                {
                    title: 'If Not Breathing - Begin CPR',
                    description: 'Give 5 rescue breaths first (drowning victims need air). Then begin standard CPR: 30 compressions, 2 breaths. Continue until help arrives.'
                },
                {
                    title: 'If Breathing - Recovery Position',
                    description: 'Place on their side to let water drain from mouth. Keep them warm with blankets or dry clothing.'
                },
                {
                    title: 'Treat for Hypothermia',
                    description: 'Remove wet clothing, wrap in warm blankets. Don\'t rub skin - warm gradually. Give warm drinks only if conscious and alert.'
                },
                {
                    title: 'Monitor Closely',
                    description: 'Even if they seem fine, get medical evaluation. "Secondary drowning" can occur hours later from water in lungs.'
                }
            ],
            dontDo: [
                'Don\'t attempt water rescue unless trained',
                'Don\'t delay CPR to drain water from lungs',
                'Don\'t give up CPR - drowning victims can recover after long resuscitation',
                'Don\'t assume they\'re fine even if they recover quickly',
                'Don\'t rub their body to warm them - warm gradually'
            ]
        },

        electric: {
            title: 'Electric Shock',
            icon: 'fa-bolt',
            severity: 'high',
            warning: 'Don\'t touch the person if they\'re still in contact with the electrical source!',
            steps: [
                {
                    title: 'Turn Off Power Source',
                    description: 'Switch off electricity at the source if possible - circuit breaker, unplug appliance. For high voltage, wait for professionals.'
                },
                {
                    title: 'Don\'t Touch Directly',
                    description: 'If power can\'t be turned off, use a dry non-conductive object (wooden chair, plastic item) to separate person from source.'
                },
                {
                    title: 'Call 911',
                    description: 'All electrical injuries need medical evaluation. Internal injuries may not be visible. Lightning strikes always need emergency care.'
                },
                {
                    title: 'Check for Response',
                    description: 'Once safe to touch, check if they\'re conscious and breathing. If not breathing or no pulse, begin CPR immediately.'
                },
                {
                    title: 'Treat Burns',
                    description: 'Electrical burns may be present at entry and exit points. Cover burns with sterile bandage. Don\'t apply ice or ointments.'
                },
                {
                    title: 'Treat for Shock',
                    description: 'Keep person lying down, elevate legs if no spinal injury suspected. Keep warm with blankets. Monitor breathing.'
                },
                {
                    title: 'Look for Other Injuries',
                    description: 'Electric shock can cause falls or muscle contractions. Check for fractures, head injuries, or other trauma.'
                }
            ],
            dontDo: [
                'Don\'t touch person while still in contact with electrical source',
                'Don\'t use wet objects or anything metal',
                'Don\'t assume low voltage isn\'t dangerous',
                'Don\'t move person if spinal injury possible',
                'Don\'t underestimate the injury - internal damage can be severe'
            ]
        },

        animal: {
            title: 'Animal Bites & Stings',
            icon: 'fa-paw',
            severity: 'medium',
            warning: 'All animal bites carry infection risk. Snake bites and severe allergic reactions need immediate care.',
            steps: [
                {
                    title: 'Ensure Safety',
                    description: 'Move away from the animal. Don\'t try to capture it, but try to remember its description for medical personnel.'
                },
                {
                    title: 'Control Bleeding',
                    description: 'Apply pressure with clean cloth to stop bleeding. Most animal bites cause moderate bleeding that can be controlled.'
                },
                {
                    title: 'Clean the Wound',
                    description: 'Wash thoroughly with soap and water for at least 5 minutes. This is crucial for preventing infection and rabies.'
                },
                {
                    title: 'Apply Antibiotic & Bandage',
                    description: 'Apply antibiotic ointment and cover with clean bandage. Change dressing daily and watch for infection signs.'
                },
                {
                    title: 'For Snake Bites',
                    description: 'Keep the person calm and still. Remove jewelry near bite. Keep bitten area below heart level. Don\'t cut, suck, or apply ice. Call 911 for any snake bite.'
                },
                {
                    title: 'For Insect Stings',
                    description: 'Remove stinger by scraping (don\'t squeeze). Clean area, apply ice for 10 minutes. Take antihistamine for swelling. Watch for allergic reaction.'
                },
                {
                    title: 'Seek Medical Care',
                    description: 'Get medical help for: deep wounds, face/hand bites, signs of infection (increasing redness, warmth, pus, fever), all snake bites, or if rabies is possible.'
                }
            ],
            dontDo: [
                'Don\'t try to suck out venom from snake bites',
                'Don\'t apply ice directly to snake bites',
                'Don\'t apply tourniquet for snake bites',
                'Don\'t squeeze bee stingers - scrape them off',
                'Don\'t ignore bites from wild or unknown animals (rabies risk)'
            ]
        },

        heat: {
            title: 'Heat Emergencies',
            icon: 'fa-temperature-high',
            severity: 'medium',
            warning: 'Heat stroke is life-threatening! If temperature is 103°F+ with confusion, call 911.',
            steps: [
                {
                    title: 'Recognize Heat Stroke vs Exhaustion',
                    description: 'Heat STROKE: hot dry skin, confusion, high temp 103°F+, loss of consciousness. Heat EXHAUSTION: heavy sweating, weakness, cool clammy skin, nausea.'
                },
                {
                    title: 'Move to Cool Area',
                    description: 'Get the person to air conditioning or shade immediately. Remove excess clothing.'
                },
                {
                    title: 'Cool Them Down',
                    description: 'For heat stroke: immerse in cold water if possible, or apply ice packs to neck, armpits, and groin. For exhaustion: cool water on skin, fan them.'
                },
                {
                    title: 'Hydrate (if conscious)',
                    description: 'For heat exhaustion: give cool water or sports drinks in small sips. Don\'t give fluids if vomiting or confused.'
                },
                {
                    title: 'Call 911 for Heat Stroke',
                    description: 'Heat stroke is a medical emergency. Call 911 immediately. Continue cooling efforts while waiting.'
                },
                {
                    title: 'Monitor Temperature',
                    description: 'If you have a thermometer, check temperature. Continue cooling until body temp drops to 101-102°F.'
                },
                {
                    title: 'Watch for Worsening',
                    description: 'Heat exhaustion can progress to heat stroke. If symptoms worsen or person becomes confused, treat as heat stroke.'
                }
            ],
            dontDo: [
                'Don\'t give fluids if person is confused or vomiting',
                'Don\'t use alcohol to cool them (causes shivering)',
                'Don\'t give fever-reducing medication (won\'t help heat stroke)',
                'Don\'t leave them alone',
                'Don\'t ignore early symptoms - they can progress quickly'
            ]
        },

        cold: {
            title: 'Cold Emergencies',
            icon: 'fa-snowflake',
            severity: 'medium',
            warning: 'Hypothermia and severe frostbite are medical emergencies. Call 911.',
            steps: [
                {
                    title: 'Recognize the Signs',
                    description: 'Hypothermia: shivering, confusion, slurred speech, drowsiness, loss of coordination. Frostbite: numbness, waxy skin, white/grayish color, hard texture.'
                },
                {
                    title: 'Get Out of Cold',
                    description: 'Move person to warm shelter. If indoors isn\'t available, protect from wind and ground cold with blankets or other insulation.'
                },
                {
                    title: 'Remove Wet Clothing',
                    description: 'Replace wet clothes with dry ones or blankets. Wet clothing dramatically increases heat loss.'
                },
                {
                    title: 'Warm Gradually',
                    description: 'Cover with blankets, especially the head. Use body heat - have another person lie next to them. Use warm (not hot) compresses on center of body.'
                },
                {
                    title: 'For Frostbite',
                    description: 'Don\'t rub frostbitten areas. Warm in lukewarm water (98-105°F). Don\'t use direct heat. Don\'t rewarm if refreezing is possible.'
                },
                {
                    title: 'Give Warm Drinks',
                    description: 'If conscious and able to swallow, give warm (not hot), non-alcoholic, non-caffeinated drinks.'
                },
                {
                    title: 'Call 911',
                    description: 'Get emergency help for severe hypothermia (confusion, unconsciousness, very slow breathing) or deep frostbite.'
                }
            ],
            dontDo: [
                'Don\'t rub frostbitten skin',
                'Don\'t use direct heat (fire, heating pad) - can cause burns',
                'Don\'t give alcohol - it increases heat loss',
                'Don\'t walk on frostbitten feet unless necessary',
                'Don\'t rewarm frostbite if refreezing is possible'
            ]
        },

        pregnancy: {
            title: 'Pregnancy Emergency',
            icon: 'fa-baby',
            severity: 'high',
            warning: 'Call 911 for heavy bleeding, severe pain, or if delivery seems imminent.',
            steps: [
                {
                    title: 'Call 911',
                    description: 'For any pregnancy emergency - heavy bleeding, severe abdominal pain, water breaking before 37 weeks, or baby coming - call emergency services.'
                },
                {
                    title: 'Keep Her Calm',
                    description: 'Help her find a comfortable position (usually on left side). Speak calmly and reassuringly.'
                },
                {
                    title: 'For Heavy Bleeding',
                    description: 'Have her lie down. Don\'t insert anything into the vagina. Place a pad or clean cloth to absorb blood. Note how much blood and any tissue passed.'
                },
                {
                    title: 'If Labor Has Started',
                    description: 'Time contractions (start to start). If less than 5 minutes apart and intense, prepare for possible delivery. Keep 911 on the line for guidance.'
                },
                {
                    title: 'If Delivery is Imminent',
                    description: 'Don\'t try to delay delivery. Place clean towels under her. Support baby\'s head as it emerges. Don\'t pull the baby. Let the cord be - don\'t cut it.'
                },
                {
                    title: 'After Delivery',
                    description: 'Keep baby warm against mother\'s skin. Cover both with blankets. Wipe baby\'s face clear of mucus. Don\'t pull on umbilical cord.'
                },
                {
                    title: 'Watch for Complications',
                    description: 'Get immediate help for: cord around neck (gently slip it over head), baby not breathing (gentle stimulation, CPR if needed), heavy bleeding after delivery.'
                }
            ],
            dontDo: [
                'Don\'t try to delay delivery if it\'s happening',
                'Don\'t cut the umbilical cord unless instructed and with sterile supplies',
                'Don\'t pull on the cord or baby',
                'Don\'t leave mother or baby alone',
                'Don\'t ignore warning signs - call for help'
            ]
        }
    },

    tips: [
        {
            icon: 'fa-first-aid',
            title: 'Stay Calm',
            description: 'Your calm demeanor helps the victim stay calm too. Take a deep breath before acting.'
        },
        {
            icon: 'fa-phone',
            title: 'Know Emergency Numbers',
            description: 'Always know local emergency numbers. In the US, 911 works for all emergencies.'
        },
        {
            icon: 'fa-box-open',
            title: 'Keep a First Aid Kit',
            description: 'Have a well-stocked first aid kit at home, in your car, and know where kits are at work.'
        },
        {
            icon: 'fa-graduation-cap',
            title: 'Take a Course',
            description: 'Consider taking a certified first aid and CPR course. Hands-on training saves lives.'
        },
        {
            icon: 'fa-shield-alt',
            title: 'Protect Yourself First',
            description: 'Ensure your safety before helping. You can\'t help if you become a victim too.'
        },
        {
            icon: 'fa-clipboard-check',
            title: 'ABC Rule',
            description: 'Remember: Airway, Breathing, Circulation - check these first in any emergency.'
        }
    ]
};
