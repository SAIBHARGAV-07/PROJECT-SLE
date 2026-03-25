const locationData = {
    India: {
        "Andaman and Nicobar Islands": ["North and Middle Andaman", "South Andaman", "Nicobar"],
        "Andhra Pradesh": ["Visakhapatnam", "Krishna", "Guntur", "East Godavari", "West Godavari", "Chittoor", "Kadapa", "Nellore", "Prakasam", "Anantapur", "Kurnool", "Tirupati"],
        "Arunachal Pradesh": ["Papum Pare", "Lohit", "Changlang", "West Kameng", "East Kameng", "Kurung Kumey", "Dibang Valley"],
        "Assam": ["Kamrup Metropolitan", "Nagaon", "Sonitpur", "Barpeta", "Dhubri", "Goalpara", "Kokrajhar", "Chirang", "Udalguri", "Nalbari", "Darrang", "Marigaon", "Morigaon", "Hojai", "Sibsagar", "Dibrugarh", "Tinsukia"],
        "Bihar": ["Patna", "East Champaran", "West Champaran", "Sitamarhi", "Madhubani", "Supaul", "Araria", "Kishanganj", "Purnea", "Katihar", "Madhepura", "Saharsa", "Darbhanga", "Muzaffarpur", "Vaishali", "Saran", "Siwan", "Gopalganj", "Bahraich", "Gaya", "Jehanabad", "Aurangabad", "Nawada"],
        "Chhattisgarh": ["Raipur", "Durg", "Bilaspur", "Rajnand Gaon", "Dhamtari", "Mahasamund", "Raigarh", "Korba", "Mandir", "Bastar", "Kanker", "Jagdalpur"],
        "Chandigarh": ["Chandigarh"],
        "Dadra and Nagar Haveli": ["Dadra and Nagar Haveli"],
        "Daman and Diu": ["Daman", "Diu"],
        "Delhi": ["New Delhi", "Central Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "North East Delhi", "North West Delhi", "South East Delhi", "South West Delhi"],
        "Goa": ["North Goa", "South Goa"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Junagadh", "Rajkot", "Jamnagar", "Bhavnagar", "Anand", "Kheda", "Panchmahal", "Dahabhai", "Gandhinagar", "Aravalli", "Kutch", "Porbandar", "Amreli"],
        "Haryana": ["Faridabad", "Gurgaon", "Hisar", "Rohtak", "Panipat", "Ambala", "Karnal", "Kurukshetra", "Kaithal", "Yamunanagar", "Panchkula", "Nuh", "Rewari", "Fatehabad"],
        "Himachal Pradesh": ["Kangra", "Mandi", "Shimla", "Kinnaur", "Lahul and Spiti", "Chamba", "Sirmour", "Solan", "Bilaspur", "Hamirpur"],
        "Jharkhand": ["Ranchi", "Dhanbad", "Giridih", "Deoghar", "Dumka", "Godda", "Pakur", "Sahebganj", "Singhbhum", "Seraikela Kharsawan", "West Singhbhum", "Bokaro", "Hazaribagh", "Koderma", "Gumla", "Lohardaga", "Ramgarh"],
        "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Tumkur", "Hassan", "Mandya", "Kolar", "Chikmagalur", "Shimoga", "Chitradurga", "Davangere", "Uttara Kannada", "Belgaum", "Bijapur", "Gulbarga", "Raichur", "Yadgir"],
        "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Ernakulam", "Idukki", "Kottayam", "Alappuzha", "Pathanamthitta", "Kollam", "Kannur", "Kasaragod", "Wayanad"],
        "Ladakh": ["Leh", "Kargil"],
        "Lakshadweep": ["Lakshadweep"],
        "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Seoni", "Katni", "Satna", "Chhatarpur", "Panna", "Rewa", "Shahdol", "Singrauli", "Chhindwara", "Betul", "Khargone", "Khandwa", "Mortakos"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Amaravati", "Akola", "Jalna", "Beed", "Usmanabad", "Latur", "Parbhani", "Ahmednagar", "Solapur", "Sangli", "Satara", "Kolhapur", "Ratnagiri", "Sindhudurg", "Thane", "Raigad", "Goa"],
        "Manipur": ["Imphal East", "Imphal West", "Senapati", "Tamenglong", "Ukhrul", "Chandel", "Thoubal", "Kakching", "Bishnupur"],
        "Meghalaya": ["Khasi Hills", "Jaintia Hills", "Garo Hills", "East Khasi Hills", "South Garo Hills", "West Garo Hills"],
        "Mizoram": ["Aizawl", "Lunglei", "Chimtuipui", "Mamit", "Serchhip", "Kolasib", "Champhai"],
        "Nagaland": ["Kohima", "Dimapur", "Wokha", "Zunheboto", "Mokokchung", "Tuensang", "Kiphire", "Longleng", "Mon"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Sambalpur", "Rourkela", "Berhampur", "Balasore", "Bhadrak", "Jajpur", "Dhenkanal", "Angul", "Deogarh", "Sundargarh", "Bargarh", "Bolangir", "Kalahandi", "Jharsuguda", "Kendujhar"],
        "Puducherry": ["Pondicherry", "Yanam", "Mahe", "Karaikal"],
        "Punjab": ["Ludhiana", "Amritsar", "Chandigarh", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Gurdaspur", "Ferozepur", "Firozpur", "Kapurthala"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Kota", "Bikaner", "Alwar", "Pali", "Nagaur", "Tonk", "Chittorgarh", "Bhilwara", "Banswara", "Dungarpur", "Rajasamand", "Barmer", "Jaisalmer", "Ganganagar"],
        "Sikkim": ["Gangtok", "East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Erode", "Tirunelveli", "Kanyakumari", "Villupuram", "Vellore", "Kanchipuram", "Chengalpattu", "Cuddalore", "Nagapattinam", "Thanjavur", "Tiruvarur", "Perambalur", "Ariyalur", "Kallakurichi", "Ranipet", "Thoothukudi"],
        "Telangana": ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Adilabad", "Medak", "Vikarabad", "Sangareddy", "Mahbubnagar", "Medchal", "Rangareddy", "Yadadri", "Nalgonda"],
        "Tripura": ["Agartala", "West Tripura", "North Tripura", "Dhalai"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly", "Moradabad", "Mathura", "Azamgarh", "Gorakhpur", "Saharanpur", "Rajastan", "Mirzapur", "Sonbhadra", "Bijnot"],
        "Uttarakhand": ["Dehradun", "Nainital", "Garhwal", "Almora", "Pithoragarh", "Bageshwar", "Chamoli", "Rudraprayag", "Uttarkashi", "Haridwar"],
        "West Bengal": ["Kolkata", "Darjeeling", "Jalpaiguri", "Cooch Behar", "Alipurduar", "Siliguri", "Dinajpur", "Malda", "Murshidabad", "Birbhum", "Burdwan", "Asansol", "Hooghly", "Medinipur", "Bankura", "24 Parganas", "South 24 Parganas"]
    }
};

function loadStates() {
    const country = document.getElementById("country").value;
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");

    stateSelect.innerHTML = '<option value="">Select State</option>';
    citySelect.innerHTML = '<option value="">Select City</option>';

    if (country === "") return;

    for (let state in locationData[country]) {
        let option = document.createElement("option");
        option.value = state;
        option.text = state;
        stateSelect.add(option);
    }
}

function loadCities() {
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;
    const citySelect = document.getElementById("city");

    citySelect.innerHTML = '<option value="">Select City/District</option>';

    if (state === "") return;

    locationData[country][state].forEach(city => {
        let option = document.createElement("option");
        option.value = city;
        option.text = city;
        citySelect.add(option);
    });
}
