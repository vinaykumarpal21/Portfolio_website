document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle Script
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeToggleIcon = themeToggleBtn.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeToggleIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.querySelector('i').className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
    }
        
    // 3. Complete Database: 28 States + All 8 Union Territories
    const regionPortals = {
        "Uttar Pradesh": { 
            type: "State", capital: "Lucknow", portal: "UP BhuNaksha Portal", details: "View digitized cadastral maps, plot info & owner details.", url: "https://upbhunaksha.gov.in", coords: [26.8467, 80.9462], img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80", 
            cm: "Yogi Adityanath", cmTitle: "Chief Minister, Uttar Pradesh", cmImg: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Yogi_Adityanath_2017_%28cropped%29.jpg", role: "Chief Minister" 
        },
        "Maharashtra": { 
            type: "State", capital: "Mumbai", portal: "Maharashtra BhuNaksha Portal", details: "Access Mahabhumi 7/12, 8A and district maps.", url: "https://bhunaksha.mahabhumi.gov.in", coords: [19.0760, 72.8777], img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80", 
            cm: "Devendra Fadnavis", cmTitle: "Chief Minister, Maharashtra", cmImg: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Devendra_Fadnavis_%28cropped%29.jpg", role: "Chief Minister" 
        },
        "Bihar": { 
            type: "State", capital: "Patna", portal: "Bihar BhuNaksha Portal", details: "Check BiharBhumi land records and cadastral maps.", url: "https://biharbhumi.bihar.gov.in/Biharbhumi/", coords: [25.5941, 85.1376], img: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?auto=format&fit=crop&w=600&q=80", 
            cm: "Nitish Kumar", cmTitle: "Chief Minister, Bihar", cmImg: "https://upload.wikimedia.org/wikipedia/commons/9/91/Nitish_Kumar_2015.jpg", role: "Chief Minister" 
        },
        "Madhya Pradesh": { 
            type: "State", capital: "Bhopal", portal: "MP BhuNaksha Portal", details: "Check MP land parcel maps, khasra & khatauni.", url: "https://mpbhunaksha.nic.in", coords: [23.2599, 77.4126], img: "https://images.unsplash.com/photo-1584467735811-62848fc59626?auto=format&fit=crop&w=600&q=80", 
            cm: "Mohan Yadav", cmTitle: "Chief Minister, Madhya Pradesh", cmImg: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Dr._Mohan_Yadav.jpg", role: "Chief Minister" 
        },
        "Rajasthan": { 
            type: "State", capital: "Jaipur", portal: "Rajasthan BhuNaksha Portal", details: "Online Naksha verification & land map records.", url: "https://bhunaksha.raj.nic.in", coords: [26.9124, 75.7873], img: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=600&q=80", 
            cm: "Bhajan Lal Sharma", cmTitle: "Chief Minister, Rajasthan", cmImg: "https://upload.wikimedia.org/wikipedia/commons/8/86/BhajanLalSharma.jpg", role: "Chief Minister" 
        },
        "Gujarat": { 
            type: "State", capital: "Gandhinagar", portal: "AnyROR Gujarat Naksha", details: "View rural/urban land records and survey numbers.", url: "https://anyror.gujarat.gov.in", coords: [23.2156, 72.6369], img: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=600&q=80", 
            cm: "Bhupendra Patel", cmTitle: "Chief Minister, Gujarat", cmImg: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Bhupendra_Patel_2022.jpg", role: "Chief Minister" 
        },
        "Karnataka": { 
            type: "State", capital: "Bengaluru", portal: "Bhoomi Land Records", details: "Access RTC, mutation status and property maps.", url: "https://landrecords.karnataka.gov.in", coords: [12.9716, 77.5946], img: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80", 
            cm: "Siddaramaiah", cmTitle: "Chief Minister, Karnataka", cmImg: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Siddaramaiah_%28cropped%29.jpg", role: "Chief Minister" 
        },
        "Tamil Nadu": { 
            type: "State", capital: "Chennai", portal: "Tamil Nadu e-Services Chitta", details: "Verify Chitta, Adangal and land ownership.", url: "https://eservices.tn.gov.in", coords: [13.0827, 80.2707], img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80", 
            cm: "M. K. Stalin", cmTitle: "Chief Minister, Tamil Nadu", cmImg: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", role: "Chief Minister" 
        },
        "West Bengal": { 
            type: "State", capital: "Kolkata", portal: "Banglarbhumi Land Records", details: "Check RoR status, plot information and maps.", url: "https://banglarbhumi.gov.in", coords: [22.5726, 88.3639], img: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=600&q=80", 
            cm: "Mamata Banerjee", cmTitle: "Chief Minister, West Bengal", cmImg: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", role: "Chief Minister" 
        },
        "Andhra Pradesh": { 
            type: "State", capital: "Amaravati", portal: "AP MeeBhoomi Portal", details: "Access adangal, village maps and land records.", url: "https://meebhoomi.ap.gov.in", coords: [16.5062, 80.6480], img: "https://images.unsplash.com/photo-1621644837446-271d187216ee?auto=format&fit=crop&w=600&q=80", 
            cm: "N. Chandrababu Naidu", cmTitle: "Chief Minister, Andhra Pradesh", cmImg: "https://upload.wikimedia.org/wikipedia/commons/5/50/N_Chandrababu_Naidu_Official.jpg", role: "Chief Minister" 
        },
        "Telangana": { 
            type: "State", capital: "Hyderabad", portal: "Telangana Dharani Portal", details: "Integrated land records management system.", url: "https://dharani.telangana.gov.in", coords: [17.3850, 78.4867], img: "https://images.unsplash.com/photo-1601614740700-1111624c94f1?auto=format&fit=crop&w=600&q=80", 
            cm: "A. Revanth Reddy", cmTitle: "Chief Minister, Telangana", cmImg: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Anumula_Revanth_Reddy_in_2023.jpg", role: "Chief Minister" 
        },
        "Kerala": { 
            type: "State", capital: "Thiruvananthapuram", portal: "Kerala Land Revenue", details: "Access Fair Value, land tax and records.", url: "https://landrevenue.kerala.gov.in", coords: [8.5241, 76.9366], img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80", 
            cm: "Pinarayi Vijayan", cmTitle: "Chief Minister, Kerala", cmImg: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", role: "Chief Minister" 
        },
        "Odisha": { 
            type: "State", capital: "Bhubaneswar", portal: "Odisha Bhulekh Portal", details: "View RoR, map records and plot status.", url: "https://bhulekh.ori.nic.in", coords: [20.2961, 85.8245], img: "https://images.unsplash.com/photo-1622308644456-a36c5324b17e?auto=format&fit=crop&w=600&q=80", 
            cm: "Mohan Charan Majhi", cmTitle: "Chief Minister, Odisha", cmImg: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Mohan_Charan_Majhi.jpg", role: "Chief Minister" 
        },
        "Punjab": { 
            type: "State", capital: "Chandigarh", portal: "Jamabandi Punjab Portal", details: "Check fard, jamabandi and property mutations.", url: "https://jamabandi.punjab.gov.in", coords: [30.7333, 76.5794], img: "https://images.unsplash.com/photo-1621570279611-db246292b7c7?auto=format&fit=crop&w=600&q=80", 
            cm: "Bhagwant Mann", cmTitle: "Chief Minister, Punjab", cmImg: "https://upload.wikimedia.org/wikipedia/commons/2/22/Bhagwant_Mann_2022_%28cropped%29.jpg", role: "Chief Minister" 
        },
        "Haryana": { 
            type: "State", capital: "Chandigarh", portal: "Haryana Jamabandi Naksha", details: "Access land registry and cadastral maps.", url: "https://jamabandi.nic.in", coords: [30.7333, 76.9794], img: "https://images.unsplash.com/photo-1621570279611-db246292b7c7?auto=format&fit=crop&w=600&q=80", 
            cm: "Nayab Singh Saini", cmTitle: "Chief Minister, Haryana", cmImg: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Nayab_Singh_Saini.jpg", role: "Chief Minister" 
        },
        "Jharkhand": { 
            type: "State", capital: "Ranchi", portal: "Jharkhand JharBhumi", details: "View register-II and land parcel details.", url: "https://jharbhoomi.jharkhand.gov.in", coords: [23.3441, 85.3096], img: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?auto=format&fit=crop&w=600&q=80", 
            cm: "Hemant Soren", cmTitle: "Chief Minister, Jharkhand", cmImg: "https://upload.wikimedia.org/wikipedia/commons/6/67/Hemant_Soren_2020.jpg", role: "Chief Minister" 
        },
        "Chhattisgarh": { 
            type: "State", capital: "Raipur", portal: "Chhattisgarh Bhuiyan", details: "Access khasra details and digitized maps.", url: "https://bhuiyan.cg.nic.in", coords: [21.2514, 81.6296], img: "https://images.unsplash.com/photo-1584467735811-62848fc59626?auto=format&fit=crop&w=600&q=80", 
            cm: "Vishnu Deo Sai", cmTitle: "Chief Minister, Chhattisgarh", cmImg: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Vishnu_Deo_Sai.jpg", role: "Chief Minister" 
        },
        "Assam": { 
            type: "State", capital: "Dispur", portal: "Assam Dharitri Portal", details: "Computerized land records and mutations.", url: "https://ilrms.assam.gov.in", coords: [26.1445, 91.7898], img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", 
            cm: "Himanta Biswa Sarma", cmTitle: "Chief Minister, Assam", cmImg: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Himanta_Biswa_Sarma_2023.jpg", role: "Chief Minister" 
        },
        "Uttarakhand": { 
            type: "State", capital: "Dehradun", portal: "Uttarakhand Bhulekh", details: "Check khatauni, ownership and plot details.", url: "https://bhulekh.uk.gov.in", coords: [30.3165, 78.0322], img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=600&q=80", 
            cm: "Pushkar Singh Dhami", cmTitle: "Chief Minister, Uttarakhand", cmImg: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Pushkar_Singh_Dhami_2022.jpg", role: "Chief Minister" 
        },
        "Himachal Pradesh": { 
            type: "State", capital: "Shimla", portal: "Himachal Bhulekh", details: "View jamabandi and land mutation status.", url: "https://himachal.nic.in", coords: [31.1048, 77.1734], img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80", 
            cm: "Sukhvinder Singh Sukhu", cmTitle: "Chief Minister, Himachal Pradesh", cmImg: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Sukhvinder_Singh_Sukhu.jpg", role: "Chief Minister" 
        },
        "Tripura": { 
            type: "State", capital: "Agartala", portal: "Tripura Jamabandi", details: "Online land records and RoR verification.", url: "https://epod.tripura.gov.in", coords: [23.8315, 91.2868], img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", 
            cm: "Manik Saha", cmTitle: "Chief Minister, Tripura", cmImg: "https://upload.wikimedia.org/wikipedia/commons/6/63/Manik_Saha_official_portrait.jpg", role: "Chief Minister" 
        },
        "Meghalaya": { 
            type: "State", capital: "Shillong", portal: "Meghalaya Land Records", details: "Access revenue department portals.", url: "https://megrevenuedd.gov.in", coords: [25.5788, 91.8933], img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", 
            cm: "Conrad Sangma", cmTitle: "Chief Minister, Meghalaya", cmImg: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Conrad_Sangma_2018.jpg", role: "Chief Minister" 
        },
        "Manipur": { 
            type: "State", capital: "Imphal", portal: "Manipur Land Records", details: "View computerized records of rights.", url: "https://lrcmanipur.nic.in", coords: [24.8170, 93.9368], img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", 
            cm: "N. Biren Singh", cmTitle: "Chief Minister, Manipur", cmImg: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", role: "Chief Minister" 
        },
        "Nagaland": { 
            type: "State", capital: "Kohima", portal: "Nagaland Land Revenue", details: "Official land ownership and records.", url: "https://landrevenue.nagaland.gov.in", coords: [25.6751, 94.1086], img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", 
            cm: "Neiphiu Rio", cmTitle: "Chief Minister, Nagaland", cmImg: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Neiphiu_Rio_2018.jpg", role: "Chief Minister" 
        },
        "Goa": { 
            type: "State", capital: "Panaji", portal: "Goa Land Records", details: "Access Form I & XIV and property plans.", url: "https://eservices.goa.gov.in", coords: [15.4909, 73.8278], img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80", 
            cm: "Pramod Sawant", cmTitle: "Chief Minister, Goa", cmImg: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Pramod_Sawant_2019.jpg", role: "Chief Minister" 
        },
        "Arunachal Pradesh": { 
            type: "State", capital: "Itanagar", portal: "Arunachal Land Records", details: "State land administration portal.", url: "https://arunachal.gov.in", coords: [27.0844, 93.6053], img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", 
            cm: "Pema Khandu", cmTitle: "Chief Minister, Arunachal Pradesh", cmImg: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Pema_Khandu_2018.jpg", role: "Chief Minister" 
        },
        "Mizoram": { 
            type: "State", capital: "Aizawl", portal: "Mizoram Land Revenue", details: "Pass and land settlement records.", url: "https://lras.mizoram.gov.in", coords: [23.7271, 92.7176], img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", 
            cm: "Lalduhoma", cmTitle: "Chief Minister, Mizoram", cmImg: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Lalduhoma_2023.jpg", role: "Chief Minister" 
        },
        "Sikkim": { 
            type: "State", capital: "Gangtok", portal: "Sikkim Land Revenue", details: "Land register and survey information.", url: "https://sikkim.gov.in", coords: [27.3389, 88.6065], img: "https://images.unsplash.com/photo-1581793745862-99fce1890249?auto=format&fit=crop&w=600&q=80", 
            cm: "Prem Singh Tamang", cmTitle: "Chief Minister, Sikkim", cmImg: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Prem_Singh_Tamang_2019.jpg", role: "Chief Minister" 
        },

        // Union Territories (All 8)
        "Delhi": { 
            type: "Union Territory", capital: "New Delhi", portal: "Delhi Land Records (Bhulekh Delhi)", details: "View record of rights (RoR) and ownership details.", url: "https://landrecords.delhi.gov.in", coords: [28.6139, 77.2090], img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80", 
            cm: "Atishi", cmTitle: "Chief Minister, Delhi", cmImg: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", role: "Chief Minister" 
        },
        "Jammu and Kashmir": { 
            type: "Union Territory", capital: "Srinagar / Jammu", portal: "J&K Land Records (JK-LRIS)", details: "Official land records and digital RoR portal.", url: "https://jklandrecords.nic.in", coords: [34.0837, 74.7973], img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80", 
            cm: "Omar Abdullah", cmTitle: "Chief Minister, Jammu & Kashmir", cmImg: "https://upload.wikimedia.org/wikipedia/commons/6/62/Omar_Abdullah_2009.jpg", role: "Chief Minister" 
        },
        "Puducherry": { 
            type: "Union Territory", capital: "Puducherry", portal: "Puducherry Revenue Department Portal", details: "Access regional land registration and survey maps.", url: "https://py.gov.in", coords: [11.9416, 79.8083], img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80", 
            cm: "N. Rangaswamy", cmTitle: "Chief Minister, Puducherry", cmImg: "https://upload.wikimedia.org/wikipedia/commons/1/1d/N._Rangaswamy_2021.jpg", role: "Chief Minister" 
        },
        "Andaman and Nicobar Islands": { 
            type: "Union Territory", capital: "Port Blair", portal: "Andaman Land Records Portal", details: "Access Island land registry, survey maps and RoR.", url: "https://anekam.andaman.gov.in", coords: [11.6234, 92.7265], img: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80", 
            cm: "D.K. Joshi", cmTitle: "Lieutenant Governor, A & N Islands", cmImg: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", role: "Administrator" 
        },
        "Chandigarh": { 
            type: "Union Territory", capital: "Chandigarh", portal: "Chandigarh Administration Land Records", details: "E-Sampark & land administration portal for Chandigarh.", url: "https://chandigarh.gov.in", coords: [30.7333, 76.7794], img: "https://images.unsplash.com/photo-1621570279611-db246292b7c7?auto=format&fit=crop&w=600&q=80", 
            cm: "Gulab Chand Kataria", cmTitle: "Administrator / Governor, Chandigarh", cmImg: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", role: "Administrator" 
        },
        "Dadra and Nagar Haveli and Daman and Diu": { 
            type: "Union Territory", capital: "Daman", portal: "DNH & DD Revenue Portal", details: "Access property registration and land records.", url: "https://daman.nic.in", coords: [20.3974, 72.8328], img: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=600&q=80", 
            cm: "Praful Khoda Patel", cmTitle: "Administrator, DNH & DD", cmImg: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", role: "Administrator" 
        },
        "Ladakh": { 
            type: "Union Territory", capital: "Leh / Kargil", portal: "Ladakh Land Records Portal", details: "Official digital land records and mutations portal.", url: "https://ladakh.gov.in", coords: [34.1526, 77.5771], img: "https://images.unsplash.com/photo-1581793745862-99fce1890249?auto=format&fit=crop&w=600&q=80", 
            cm: "BD Mishra", cmTitle: "Lieutenant Governor, Ladakh", cmImg: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", role: "Administrator" 
        },
        "Lakshadweep": { 
            type: "Union Territory", capital: "Kavaratti", portal: "Lakshadweep Revenue Portal", details: "Island administration land records and services.", url: "https://lakshadweep.gov.in", coords: [10.5667, 72.6417], img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", 
            cm: "Patel Harshadhai Tribhovandas", cmTitle: "Administrator, Lakshadweep", cmImg: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", role: "Administrator" 
        }
    };

    // Initialize Leaflet Map centered over India
    const map = L.map('leafletIndiaMap', {
        center: [22.5937, 82.9629],
        zoom: 4.5,
        zoomControl: true,
        attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 10,
        minZoom: 4,
        subdomains: 'abcd'
    }).addTo(map);

    const activeStateName = document.getElementById('activeStateName');
    const regionTypeLabel = document.getElementById('regionTypeLabel');
    const portalName = document.getElementById('portalName');
    const bhunakshaDirectLink = document.getElementById('bhunakshaDirectLink');
    const capitalCityName = document.getElementById('capitalCityName');
    const regionCityImg = document.getElementById('regionCityImg');
    const overlayCityName = document.getElementById('overlayCityName');
    const overlayRegionType = document.getElementById('overlayRegionType');
    const overlayBadge = document.getElementById('overlayBadge');
    
    // CM DOM Elements
    const cmAvatarImg = document.getElementById('cmAvatarImg');
    const cmNameText = document.getElementById('cmNameText');
    const cmTitleText = document.getElementById('cmTitleText');
    const cmRoleLabel = document.getElementById('cmRoleLabel');

    // Add markers for all regions including island UTs
    Object.keys(regionPortals).forEach(regionName => {
        const info = regionPortals[regionName];
        
        const markerIcon = L.divIcon({
            className: 'region-marker',
            html: `<div style="width: 14px; height: 14px; background: #d97706; border: 2px solid #ffffff; border-radius: 50%; box-shadow: 0 0 12px #d97706, 0 0 4px #000000; cursor: pointer;"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        const marker = L.marker(info.coords, { 
            icon: markerIcon,
            riseOnHover: true 
        }).addTo(map);

        marker.on('mouseover', () => {
            regionTypeLabel.textContent = `Selected ${info.type}`;
            activeStateName.textContent = regionName;
            capitalCityName.textContent = info.capital;
            portalName.textContent = info.portal;
            bhunakshaDirectLink.href = info.url;

            regionCityImg.src = info.img;
            overlayCityName.textContent = info.capital;
            overlayRegionType.textContent = regionName;
            overlayBadge.textContent = info.type;

            cmAvatarImg.src = info.cmImg;
            cmNameText.textContent = info.cm;
            cmTitleText.textContent = info.cmTitle;
            cmRoleLabel.textContent = info.role === 'Chief Minister' ? 'Chief Minister / Leader' : 'Administrator / Lieutenant Governor';
            
            marker.bindPopup(`
                <h3><i class="fas fa-landmark" style="color: #d97706;"></i> ${info.capital} (${regionName})</h3>
                <p style="font-size:0.78rem; color:#d97706; font-weight:600; margin-bottom:2px;">[${info.type}]</p>
                <p><strong>${info.role}:</strong> ${info.cm}</p>
                <p><strong>Portal:</strong> ${info.portal}</p>
                <a href="${info.url}" target="_blank" class="portal-link">Click to Open Portal &rarr;</a>
            `, {
                offset: [0, -10],
                closeButton: false
            }).openPopup();
        });

        marker.on('click', () => {
            window.open(info.url, '_blank');
        });
    });
});