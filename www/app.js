// FirstAid Pro - Main Application JavaScript
class FirstAidApp {
    constructor() {
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.stream = null;
        this.isRecordingVideo = true;
        this.recordingStartTime = null;
        this.recordingTimer = null;
        this.currentLocation = null;
        this.searchLocation = null; // Location to search for facilities (can be different from user's location)
        this.userCountryCode = null;
        this.selectedCountryCode = null;
        this.useCustomLocation = false;
        this.emergencyContacts = this.loadContacts();
        this.speechSynthesis = window.speechSynthesis;
        this.recognition = null;
        this.currentFacingMode = 'environment';
        this.nearbyFacilities = [];
        
        this.init();
    }

    init() {
        this.renderCategories();
        this.renderTips();
        this.setupEventListeners();
        this.setupSpeechRecognition();
        this.createToastElement();
        this.detectUserCountry();
        this.setupFacilitySearch();
        this.setupLocationSelector();
        this.populateCountryDropdown();
    }

    // ==================== Toast Notifications ====================
    createToastElement() {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.id = 'toast';
        document.body.appendChild(toast);
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast active ${type}`;
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }

    // ==================== Category Rendering ====================
    renderCategories() {
        const grid = document.getElementById('categoryGrid');
        grid.innerHTML = emergencyData.categories.map(cat => `
            <div class="category-card ${cat.class}" data-id="${cat.id}">
                <i class="fas ${cat.icon}"></i>
                <h3>${cat.name}</h3>
            </div>
        `).join('');
    }

    renderTips() {
        const carousel = document.getElementById('tipsCarousel');
        carousel.innerHTML = emergencyData.tips.map(tip => `
            <div class="tip-card">
                <i class="fas ${tip.icon}"></i>
                <h4>${tip.title}</h4>
                <p>${tip.description}</p>
            </div>
        `).join('');
    }

    // ==================== Event Listeners ====================
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        searchInput.addEventListener('focus', () => this.handleSearch(searchInput.value));
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                document.getElementById('searchResults').classList.remove('active');
            }
        });

        // Voice search
        document.getElementById('voiceSearchBtn').addEventListener('click', () => this.startVoiceSearch());

        // Quick action buttons
        document.getElementById('recordVideoBtn').addEventListener('click', () => this.openRecordingModal('video'));
        document.getElementById('recordAudioBtn').addEventListener('click', () => this.openRecordingModal('audio'));
        document.getElementById('shareLocationBtn').addEventListener('click', () => this.openLocationModal());
        document.getElementById('sosBtn').addEventListener('click', () => this.openSosModal());

        // Recording modal
        document.getElementById('closeRecordingModal').addEventListener('click', () => this.closeRecordingModal());
        document.getElementById('startRecordBtn').addEventListener('click', () => this.startRecording());
        document.getElementById('stopRecordBtn').addEventListener('click', () => this.stopRecording());
        document.getElementById('switchCameraBtn').addEventListener('click', () => this.switchCamera());
        document.getElementById('downloadRecordingBtn').addEventListener('click', () => this.downloadRecording());
        document.getElementById('newRecordingBtn').addEventListener('click', () => this.newRecording());

        // Category cards
        document.getElementById('categoryGrid').addEventListener('click', (e) => {
            const card = e.target.closest('.category-card');
            if (card) this.openGuide(card.dataset.id);
        });

        // Guide modal
        document.getElementById('closeGuideModal').addEventListener('click', () => this.closeGuideModal());
        document.getElementById('backToCategories').addEventListener('click', () => this.closeGuideModal());
        document.getElementById('speakGuideBtn').addEventListener('click', () => this.toggleSpeakGuide());
        document.getElementById('printGuideBtn').addEventListener('click', () => window.print());

        // Location modal
        document.getElementById('closeLocationModal').addEventListener('click', () => this.closeLocationModal());
        document.getElementById('copyLocationBtn').addEventListener('click', () => this.copyLocation());
        document.getElementById('shareWhatsAppBtn').addEventListener('click', () => this.shareViaWhatsApp());
        document.getElementById('openMapsBtn').addEventListener('click', () => this.openInMaps());

        // SOS modal
        document.getElementById('closeSosModal').addEventListener('click', () => this.closeSosModal());
        document.getElementById('addContactBtn').addEventListener('click', () => this.addContact());
        document.getElementById('sendSosBtn').addEventListener('click', () => this.sendSosAlert());

        // Close modals on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    this.stopMedia();
                    this.stopSpeaking();
                }
            });
        });
    }

    // ==================== Search Functionality ====================
    handleSearch(query) {
        const resultsContainer = document.getElementById('searchResults');
        
        if (!query.trim()) {
            resultsContainer.classList.remove('active');
            return;
        }

        const searchTerm = query.toLowerCase();
        const results = emergencyData.categories.filter(cat => {
            const nameMatch = cat.name.toLowerCase().includes(searchTerm);
            const keywordMatch = cat.keywords.some(kw => kw.includes(searchTerm));
            return nameMatch || keywordMatch;
        });

        if (results.length > 0) {
            resultsContainer.innerHTML = results.map(cat => `
                <div class="search-result-item" data-id="${cat.id}">
                    <i class="fas ${cat.icon}"></i>
                    <div>
                        <strong>${cat.name}</strong>
                        <p style="font-size: 0.85rem; color: #666;">Click for first aid guide</p>
                    </div>
                </div>
            `).join('');
            resultsContainer.classList.add('active');

            // Add click handlers
            resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.openGuide(item.dataset.id);
                    resultsContainer.classList.remove('active');
                    document.getElementById('searchInput').value = '';
                });
            });
        } else {
            resultsContainer.innerHTML = `
                <div class="search-result-item">
                    <i class="fas fa-search"></i>
                    <div>
                        <strong>No results found</strong>
                        <p style="font-size: 0.85rem; color: #666;">Try different keywords</p>
                    </div>
                </div>
            `;
            resultsContainer.classList.add('active');
        }
    }

    // ==================== Speech Recognition ====================
    setupSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('searchInput').value = transcript;
                this.handleSearch(transcript);
                document.getElementById('voiceSearchBtn').classList.remove('listening');
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                document.getElementById('voiceSearchBtn').classList.remove('listening');
                this.showToast('Voice search error. Please try again.', 'error');
            };

            this.recognition.onend = () => {
                document.getElementById('voiceSearchBtn').classList.remove('listening');
            };
        }
    }

    startVoiceSearch() {
        if (this.recognition) {
            document.getElementById('voiceSearchBtn').classList.add('listening');
            this.recognition.start();
            this.showToast('Listening... Speak now');
        } else {
            this.showToast('Voice search not supported in this browser', 'error');
        }
    }

    // ==================== Guide Modal ====================
    openGuide(id) {
        const guide = emergencyData.guides[id];
        if (!guide) return;

        const content = document.getElementById('guideContent');
        document.getElementById('guideTitle').textContent = guide.title;

        content.innerHTML = `
            <div class="emergency-header">
                <i class="fas ${guide.icon}"></i>
                <h3>${guide.title}</h3>
                <span class="severity ${guide.severity}">${guide.severity.toUpperCase()} PRIORITY</span>
            </div>

            <div class="warning-box">
                <h4><i class="fas fa-exclamation-triangle"></i> Important</h4>
                <p>${guide.warning}</p>
            </div>

            <div class="steps-container">
                <h4><i class="fas fa-list-ol"></i> Step-by-Step Instructions</h4>
                ${guide.steps.map((step, index) => `
                    <div class="step">
                        <div class="step-number">${index + 1}</div>
                        <div class="step-content">
                            <h5>${step.title}</h5>
                            <p>${step.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="dont-do-section">
                <h4><i class="fas fa-ban"></i> What NOT To Do</h4>
                <ul>
                    ${guide.dontDo.map(item => `
                        <li><i class="fas fa-times"></i> ${item}</li>
                    `).join('')}
                </ul>
            </div>
        `;

        document.getElementById('guideModal').classList.add('active');
    }

    closeGuideModal() {
        document.getElementById('guideModal').classList.remove('active');
        this.stopSpeaking();
    }

    // ==================== Text-to-Speech ====================
    toggleSpeakGuide() {
        const btn = document.getElementById('speakGuideBtn');
        
        if (this.speechSynthesis.speaking) {
            this.stopSpeaking();
            btn.innerHTML = '<i class="fas fa-volume-up"></i> Read Aloud';
            btn.classList.remove('speaking');
        } else {
            this.speakGuide();
            btn.innerHTML = '<i class="fas fa-stop"></i> Stop Reading';
            btn.classList.add('speaking');
        }
    }

    speakGuide() {
        const content = document.getElementById('guideContent');
        const text = content.innerText;
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        utterance.onend = () => {
            const btn = document.getElementById('speakGuideBtn');
            btn.innerHTML = '<i class="fas fa-volume-up"></i> Read Aloud';
            btn.classList.remove('speaking');
        };

        this.speechSynthesis.speak(utterance);
    }

    stopSpeaking() {
        this.speechSynthesis.cancel();
        const btn = document.getElementById('speakGuideBtn');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-volume-up"></i> Read Aloud';
            btn.classList.remove('speaking');
        }
    }

    // ==================== Recording Functionality ====================
    async openRecordingModal(type) {
        this.isRecordingVideo = type === 'video';
        const modal = document.getElementById('recordingModal');
        const title = document.getElementById('recordingTitle');
        const videoPreview = document.getElementById('videoPreview');
        const audioPreview = document.getElementById('audioPreview');
        const switchBtn = document.getElementById('switchCameraBtn');
        const recordedMedia = document.getElementById('recordedMedia');

        title.textContent = this.isRecordingVideo ? 'Record Video' : 'Record Audio';
        videoPreview.style.display = this.isRecordingVideo ? 'block' : 'none';
        audioPreview.style.display = this.isRecordingVideo ? 'none' : 'block';
        switchBtn.style.display = this.isRecordingVideo ? 'inline-flex' : 'none';
        recordedMedia.classList.remove('active');

        modal.classList.add('active');

        try {
            const constraints = this.isRecordingVideo
                ? { video: { facingMode: this.currentFacingMode }, audio: true }
                : { audio: true };

            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            if (this.isRecordingVideo) {
                videoPreview.srcObject = this.stream;
            }

            this.showToast('Camera/microphone ready');
        } catch (error) {
            console.error('Error accessing media devices:', error);
            this.showToast('Could not access camera/microphone. Please grant permission.', 'error');
        }
    }

    async switchCamera() {
        this.currentFacingMode = this.currentFacingMode === 'environment' ? 'user' : 'environment';
        this.stopMedia();

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: this.currentFacingMode },
                audio: true
            });
            document.getElementById('videoPreview').srcObject = this.stream;
        } catch (error) {
            console.error('Error switching camera:', error);
            this.showToast('Could not switch camera', 'error');
        }
    }

    startRecording() {
        if (!this.stream) {
            this.showToast('Please allow camera/microphone access', 'error');
            return;
        }

        this.recordedChunks = [];
        
        const options = { mimeType: 'video/webm;codecs=vp9,opus' };
        try {
            this.mediaRecorder = new MediaRecorder(this.stream, options);
        } catch (e) {
            // Fallback for browsers that don't support vp9
            this.mediaRecorder = new MediaRecorder(this.stream);
        }

        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
            }
        };

        this.mediaRecorder.onstop = () => this.handleRecordingStop();

        this.mediaRecorder.start(100);
        this.recordingStartTime = Date.now();
        this.updateRecordingTime();

        document.getElementById('startRecordBtn').disabled = true;
        document.getElementById('stopRecordBtn').disabled = false;
        document.querySelector('.recording-dot').classList.add('active');
        
        this.showToast('Recording started');
    }

    updateRecordingTime() {
        const elapsed = Math.floor((Date.now() - this.recordingStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        document.getElementById('recordingTime').textContent = `${minutes}:${seconds}`;

        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.recordingTimer = setTimeout(() => this.updateRecordingTime(), 1000);
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            clearTimeout(this.recordingTimer);
            document.querySelector('.recording-dot').classList.remove('active');
            this.showToast('Recording stopped');
        }
    }

    handleRecordingStop() {
        const blob = new Blob(this.recordedChunks, { 
            type: this.isRecordingVideo ? 'video/webm' : 'audio/webm' 
        });
        const url = URL.createObjectURL(blob);

        const recordedVideo = document.getElementById('recordedVideo');
        recordedVideo.src = url;
        
        document.getElementById('recordedMedia').classList.add('active');
        document.getElementById('videoPreview').style.display = 'none';
        
        document.getElementById('startRecordBtn').disabled = false;
        document.getElementById('stopRecordBtn').disabled = true;

        this.recordedBlob = blob;
    }

    downloadRecording() {
        if (!this.recordedBlob) return;

        const url = URL.createObjectURL(this.recordedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `emergency_recording_${Date.now()}.${this.isRecordingVideo ? 'webm' : 'webm'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast('Recording downloaded!', 'success');
    }

    newRecording() {
        document.getElementById('recordedMedia').classList.remove('active');
        document.getElementById('videoPreview').style.display = this.isRecordingVideo ? 'block' : 'none';
        document.getElementById('recordingTime').textContent = '00:00';
        this.recordedChunks = [];
        this.recordedBlob = null;
    }

    closeRecordingModal() {
        this.stopMedia();
        this.stopRecording();
        document.getElementById('recordingModal').classList.remove('active');
        document.getElementById('recordedMedia').classList.remove('active');
        document.getElementById('startRecordBtn').disabled = false;
        document.getElementById('stopRecordBtn').disabled = true;
        document.querySelector('.recording-dot').classList.remove('active');
        document.getElementById('recordingTime').textContent = '00:00';
    }

    stopMedia() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }

    // ==================== Location Functionality ====================
    openLocationModal() {
        document.getElementById('locationModal').classList.add('active');
        this.getLocation();
    }

    closeLocationModal() {
        document.getElementById('locationModal').classList.remove('active');
    }

    getLocation() {
        const locationInfo = document.getElementById('locationInfo');
        locationInfo.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting your location...';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.currentLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };

                    locationInfo.innerHTML = `
                        <div class="coordinates">
                            <i class="fas fa-map-marker-alt"></i>
                            ${this.currentLocation.lat.toFixed(6)}, ${this.currentLocation.lng.toFixed(6)}
                        </div>
                        <div class="address">
                            Accuracy: ~${Math.round(this.currentLocation.accuracy)} meters
                        </div>
                    `;
                },
                (error) => {
                    locationInfo.innerHTML = `
                        <div style="color: #dc2626;">
                            <i class="fas fa-exclamation-triangle"></i>
                            Could not get location: ${error.message}
                        </div>
                    `;
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        } else {
            locationInfo.innerHTML = `
                <div style="color: #dc2626;">
                    <i class="fas fa-exclamation-triangle"></i>
                    Geolocation is not supported by this browser
                </div>
            `;
        }
    }

    copyLocation() {
        if (!this.currentLocation) {
            this.showToast('Location not available', 'error');
            return;
        }

        const text = `${this.currentLocation.lat}, ${this.currentLocation.lng}`;
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Location copied to clipboard!', 'success');
        });
    }

    shareViaWhatsApp() {
        if (!this.currentLocation) {
            this.showToast('Location not available', 'error');
            return;
        }

        const message = encodeURIComponent(
            `🚨 EMERGENCY - I need help!\n\nMy location:\nhttps://maps.google.com/?q=${this.currentLocation.lat},${this.currentLocation.lng}\n\nCoordinates: ${this.currentLocation.lat}, ${this.currentLocation.lng}`
        );
        window.open(`https://wa.me/?text=${message}`, '_blank');
    }

    openInMaps() {
        if (!this.currentLocation) {
            this.showToast('Location not available', 'error');
            return;
        }

        window.open(
            `https://maps.google.com/?q=${this.currentLocation.lat},${this.currentLocation.lng}`,
            '_blank'
        );
    }

    // ==================== SOS Functionality ====================
    openSosModal() {
        document.getElementById('sosModal').classList.add('active');
        this.renderContacts();
        this.getLocation(); // Get location for SOS
    }

    closeSosModal() {
        document.getElementById('sosModal').classList.remove('active');
    }

    loadContacts() {
        const saved = localStorage.getItem('emergencyContacts');
        return saved ? JSON.parse(saved) : [];
    }

    saveContacts() {
        localStorage.setItem('emergencyContacts', JSON.stringify(this.emergencyContacts));
    }

    renderContacts() {
        const list = document.getElementById('contactsList');
        
        if (this.emergencyContacts.length === 0) {
            list.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">No emergency contacts added yet.</p>';
            return;
        }

        list.innerHTML = this.emergencyContacts.map((contact, index) => `
            <div class="contact-item">
                <i class="fas fa-user-circle"></i>
                <div class="contact-info">
                    <div class="name">${contact.name}</div>
                    <div class="phone">${contact.phone}</div>
                </div>
                <button class="remove-contact" onclick="app.removeContact(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    addContact() {
        const name = prompt('Contact name:');
        if (!name) return;

        const phone = prompt('Phone number:');
        if (!phone) return;

        this.emergencyContacts.push({ name, phone });
        this.saveContacts();
        this.renderContacts();
        this.showToast('Contact added!', 'success');
    }

    removeContact(index) {
        if (confirm('Remove this contact?')) {
            this.emergencyContacts.splice(index, 1);
            this.saveContacts();
            this.renderContacts();
            this.showToast('Contact removed');
        }
    }

    sendSosAlert() {
        if (this.emergencyContacts.length === 0) {
            this.showToast('Please add emergency contacts first', 'error');
            return;
        }

        const customMessage = document.getElementById('sosMessage').value;
        let locationText = '';

        if (this.currentLocation) {
            locationText = `\n\nMy location:\nhttps://maps.google.com/?q=${this.currentLocation.lat},${this.currentLocation.lng}\n\nCoordinates: ${this.currentLocation.lat}, ${this.currentLocation.lng}`;
        }

        const message = encodeURIComponent(
            `🚨 SOS EMERGENCY ALERT 🚨\n\nI need immediate help!${customMessage ? '\n\nMessage: ' + customMessage : ''}${locationText}\n\nSent via FirstAid Pro`
        );

        // Open SMS with all contacts (works on mobile)
        const phones = this.emergencyContacts.map(c => c.phone).join(',');
        window.open(`sms:${phones}?body=${message}`, '_blank');

        // Also open WhatsApp as backup
        setTimeout(() => {
            if (confirm('Also share via WhatsApp?')) {
                window.open(`https://wa.me/?text=${message}`, '_blank');
            }
        }, 1000);

        this.showToast('Opening messaging app...', 'success');
    }

    // ==================== Country Detection & Emergency Numbers ====================
    async detectUserCountry() {
        try {
            // Try to get country from IP geolocation
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            if (data.country_code) {
                this.userCountryCode = data.country_code;
                this.updateEmergencyNumbers(data.country_code);
            }
        } catch (error) {
            console.log('Could not detect country from IP, trying geolocation...');
            this.detectCountryFromGeolocation();
        }
    }

    detectCountryFromGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        // Use reverse geocoding to get country
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json();
                        
                        if (data.address && data.address.country_code) {
                            this.userCountryCode = data.address.country_code.toUpperCase();
                            this.updateEmergencyNumbers(this.userCountryCode);
                        }
                    } catch (error) {
                        console.error('Reverse geocoding failed:', error);
                        this.setDefaultEmergencyNumbers();
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    this.setDefaultEmergencyNumbers();
                }
            );
        } else {
            this.setDefaultEmergencyNumbers();
        }
    }

    updateEmergencyNumbers(countryCode) {
        const numbers = worldwideEmergencyNumbers[countryCode];
        const countryNameEl = document.getElementById('countryName');
        const grid = document.getElementById('emergencyNumbersGrid');

        if (numbers) {
            countryNameEl.textContent = `(${numbers.country})`;
            
            grid.innerHTML = `
                <a href="tel:${numbers.general}" class="number-card">
                    <i class="fas fa-phone-alt"></i>
                    <span class="number-title">General Emergency</span>
                    <span class="number">${numbers.general}</span>
                </a>
                <a href="tel:${numbers.police}" class="number-card">
                    <i class="fas fa-shield-alt"></i>
                    <span class="number-title">Police</span>
                    <span class="number">${numbers.police}</span>
                </a>
                <a href="tel:${numbers.fire}" class="number-card">
                    <i class="fas fa-fire"></i>
                    <span class="number-title">Fire Department</span>
                    <span class="number">${numbers.fire}</span>
                </a>
                <a href="tel:${numbers.ambulance}" class="number-card">
                    <i class="fas fa-ambulance"></i>
                    <span class="number-title">Ambulance</span>
                    <span class="number">${numbers.ambulance}</span>
                </a>
            `;

            // Update the emergency banner
            const emergencyCall = document.querySelector('.emergency-call');
            if (emergencyCall) {
                emergencyCall.href = `tel:${numbers.general}`;
                emergencyCall.innerHTML = `
                    <i class="fas fa-phone-alt"></i>
                    <span>Call Emergency: ${numbers.general}</span>
                `;
            }
        } else {
            this.setDefaultEmergencyNumbers();
        }
    }

    setDefaultEmergencyNumbers() {
        const countryNameEl = document.getElementById('countryName');
        countryNameEl.textContent = '(International)';
        // Keep default 911 numbers
    }

    // ==================== Nearby Medical Facilities ====================
    setupFacilitySearch() {
        const facilityBtns = document.querySelectorAll('.facility-btn');
        facilityBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                facilityBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const facilityType = btn.dataset.type;
                this.searchNearbyFacilities(facilityType);
            });
        });
    }

    async searchNearbyFacilities(type) {
        const resultsContainer = document.getElementById('facilitiesResults');
        
        resultsContainer.innerHTML = `
            <div class="facilities-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Finding nearby ${type}s...</p>
            </div>
        `;

        let searchLoc = this.getActiveSearchLocation();

        // If using custom location mode but no location set, prompt user
        if (this.useCustomLocation && !this.searchLocation) {
            resultsContainer.innerHTML = `
                <div class="no-facilities">
                    <i class="fas fa-search-location"></i>
                    <h4>Enter a Location First</h4>
                    <p>Type a city or address above to search for facilities near that location.</p>
                </div>
            `;
            return;
        }

        // Get user's current location if not using custom location
        if (!this.useCustomLocation && !this.currentLocation) {
            try {
                const position = await this.getCurrentPosition();
                this.currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                searchLoc = this.currentLocation;
            } catch (error) {
                resultsContainer.innerHTML = `
                    <div class="no-facilities">
                        <i class="fas fa-map-marker-alt"></i>
                        <h4>Location Required</h4>
                        <p>Please enable location services or use "Help Someone Else" to enter a custom location.</p>
                        <button onclick="app.searchNearbyFacilities('${type}')" class="facility-btn" style="margin-top: 15px;">
                            <i class="fas fa-redo"></i> Try Again
                        </button>
                    </div>
                `;
                return;
            }
        }

        try {
            // Use Overpass API (OpenStreetMap) to find nearby facilities
            const facilities = await this.queryOverpassAPI(type, searchLoc);
            this.displayFacilities(facilities, type);
        } catch (error) {
            console.error('Error fetching facilities:', error);
            // Fallback to Google Maps search
            this.openGoogleMapsSearch(type);
        }
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes cache
            });
        });
    }

    async queryOverpassAPI(type, location) {
        const { lat, lng } = location;
        const radius = 5000; // 5km radius

        // Map facility types to OSM tags
        const osmTags = {
            'hospital': '["amenity"="hospital"]',
            'pharmacy': '["amenity"="pharmacy"]',
            'doctor': '["amenity"="doctors"]',
            'clinic': '["amenity"="clinic"]',
            'dentist': '["amenity"="dentist"]'
        };

        const tag = osmTags[type] || osmTags['hospital'];
        
        const query = `
            [out:json][timeout:25];
            (
                node${tag}(around:${radius},${lat},${lng});
                way${tag}(around:${radius},${lat},${lng});
                relation${tag}(around:${radius},${lat},${lng});
            );
            out body center;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: `data=${encodeURIComponent(query)}`
        });

        const data = await response.json();
        return this.processOverpassResults(data.elements, location);
    }

    processOverpassResults(elements, userLocation) {
        return elements
            .filter(el => el.tags && el.tags.name)
            .map(el => {
                const facilityLat = el.lat || el.center?.lat;
                const facilityLng = el.lon || el.center?.lon;
                const distance = this.calculateDistance(
                    userLocation.lat, 
                    userLocation.lng, 
                    facilityLat, 
                    facilityLng
                );

                return {
                    id: el.id,
                    name: el.tags.name,
                    address: this.formatAddress(el.tags),
                    phone: el.tags.phone || el.tags['contact:phone'] || null,
                    website: el.tags.website || el.tags['contact:website'] || null,
                    lat: facilityLat,
                    lng: facilityLng,
                    distance: distance,
                    openingHours: el.tags.opening_hours || 'Hours not available',
                    emergency: el.tags.emergency === 'yes'
                };
            })
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 15); // Limit to 15 results
    }

    formatAddress(tags) {
        const parts = [];
        if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
        if (tags['addr:street']) parts.push(tags['addr:street']);
        if (tags['addr:city']) parts.push(tags['addr:city']);
        if (tags['addr:postcode']) parts.push(tags['addr:postcode']);
        
        return parts.length > 0 ? parts.join(', ') : 'Address not available';
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    toRad(deg) {
        return deg * (Math.PI / 180);
    }

    displayFacilities(facilities, type) {
        const resultsContainer = document.getElementById('facilitiesResults');
        
        if (facilities.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-facilities">
                    <i class="fas fa-search"></i>
                    <h4>No ${type}s found nearby</h4>
                    <p>Try searching in a larger area using Google Maps</p>
                    <button onclick="app.openGoogleMapsSearch('${type}')" class="facility-btn" style="margin-top: 15px;">
                        <i class="fas fa-external-link-alt"></i> Search on Google Maps
                    </button>
                </div>
            `;
            return;
        }

        const icons = {
            'hospital': 'fa-hospital',
            'pharmacy': 'fa-pills',
            'doctor': 'fa-user-md',
            'clinic': 'fa-clinic-medical',
            'dentist': 'fa-tooth'
        };

        resultsContainer.innerHTML = `
            <div class="facilities-header" style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                <strong>${facilities.length} ${type}${facilities.length > 1 ? 's' : ''} found near you</strong>
            </div>
            ${facilities.map(facility => `
                <div class="facility-item">
                    <div class="facility-icon">
                        <i class="fas ${icons[type] || 'fa-hospital'}"></i>
                    </div>
                    <div class="facility-info">
                        <h4>${facility.name} ${facility.emergency ? '<span style="color: #e63946; font-size: 0.8rem;"><i class="fas fa-star-of-life"></i> 24/7</span>' : ''}</h4>
                        <p><i class="fas fa-map-marker-alt"></i> ${facility.address}</p>
                        ${facility.phone ? `<p><i class="fas fa-phone"></i> ${facility.phone}</p>` : ''}
                        <span class="facility-distance">
                            <i class="fas fa-route"></i>
                            ${facility.distance < 1 
                                ? `${Math.round(facility.distance * 1000)} m` 
                                : `${facility.distance.toFixed(1)} km`
                            }
                        </span>
                    </div>
                    <div class="facility-actions">
                        <button class="facility-action-btn directions" 
                                onclick="app.getDirections(${facility.lat}, ${facility.lng})"
                                title="Get Directions">
                            <i class="fas fa-directions"></i>
                        </button>
                        ${facility.phone ? `
                            <button class="facility-action-btn call" 
                                    onclick="window.location.href='tel:${facility.phone}'"
                                    title="Call">
                                <i class="fas fa-phone"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
            <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee;">
                <button onclick="app.openGoogleMapsSearch('${type}')" class="facility-btn">
                    <i class="fas fa-search-plus"></i> Find More on Google Maps
                </button>
            </div>
        `;
    }

    getDirections(lat, lng) {
        // Open directions in Google Maps
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank');
    }

    openGoogleMapsSearch(type) {
        const searchTerms = {
            'hospital': 'hospital emergency room',
            'pharmacy': 'pharmacy drugstore',
            'doctor': 'medical clinic doctor',
            'dentist': 'dentist dental clinic'
        };

        const searchTerm = searchTerms[type] || 'hospital';
        const location = this.getActiveSearchLocation();
        
        if (location) {
            const url = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}/@${location.lat},${location.lng},14z`;
            window.open(url, '_blank');
        } else {
            const url = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm + ' near me')}`;
            window.open(url, '_blank');
        }
    }

    // ==================== Location Selector (Help Someone Else) ====================
    setupLocationSelector() {
        // Tab switching
        const tabs = document.querySelectorAll('.location-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const mode = tab.dataset.mode;
                this.useCustomLocation = mode === 'custom-location';
                
                const customInput = document.getElementById('customLocationInput');
                if (this.useCustomLocation) {
                    customInput.style.display = 'block';
                    this.updateSearchLocationDisplay();
                } else {
                    customInput.style.display = 'none';
                    this.searchLocation = null;
                    document.getElementById('searchLocationName').textContent = 'Your current location';
                }
            });
        });

        // Location search
        const searchInput = document.getElementById('locationSearchInput');
        const searchBtn = document.getElementById('searchLocationBtn');
        
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchForLocation(e.target.value);
            }, 500);
        });

        searchBtn.addEventListener('click', () => {
            this.searchForLocation(searchInput.value);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchForLocation(searchInput.value);
            }
        });

        // Country selector
        document.getElementById('applyCountryBtn').addEventListener('click', () => {
            const select = document.getElementById('countrySelect');
            const countryCode = select.value;
            
            if (countryCode === 'auto') {
                this.detectUserCountry();
                this.showToast('Detecting your country...');
            } else {
                this.selectedCountryCode = countryCode;
                this.updateEmergencyNumbers(countryCode);
                this.showToast(`Emergency numbers updated for ${worldwideEmergencyNumbers[countryCode].country}`, 'success');
            }
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.custom-location-input')) {
                document.getElementById('locationSuggestions').classList.remove('active');
            }
        });
    }

    populateCountryDropdown() {
        const select = document.getElementById('countrySelect');
        
        // Sort countries alphabetically
        const sortedCountries = Object.entries(worldwideEmergencyNumbers)
            .sort((a, b) => a[1].country.localeCompare(b[1].country));
        
        sortedCountries.forEach(([code, data]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${data.country} (Emergency: ${data.general})`;
            select.appendChild(option);
        });
    }

    async searchForLocation(query) {
        if (!query || query.length < 3) {
            document.getElementById('locationSuggestions').classList.remove('active');
            return;
        }

        const suggestionsEl = document.getElementById('locationSuggestions');
        suggestionsEl.innerHTML = '<div class="location-suggestion-item"><i class="fas fa-spinner fa-spin"></i><div>Searching...</div></div>';
        suggestionsEl.classList.add('active');

        try {
            // Use Nominatim (OpenStreetMap) for geocoding
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
            );
            const results = await response.json();

            if (results.length === 0) {
                suggestionsEl.innerHTML = `
                    <div class="location-suggestion-item">
                        <i class="fas fa-exclamation-circle"></i>
                        <div>
                            <div class="suggestion-name">No results found</div>
                            <div class="suggestion-address">Try a different search term</div>
                        </div>
                    </div>
                `;
                return;
            }

            suggestionsEl.innerHTML = results.map(result => `
                <div class="location-suggestion-item" data-lat="${result.lat}" data-lng="${result.lon}" data-name="${result.display_name}" data-country="${result.address?.country_code?.toUpperCase() || ''}">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <div class="suggestion-name">${result.name || result.display_name.split(',')[0]}</div>
                        <div class="suggestion-address">${result.display_name}</div>
                    </div>
                </div>
            `).join('');

            // Add click handlers
            suggestionsEl.querySelectorAll('.location-suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.selectLocation({
                        lat: parseFloat(item.dataset.lat),
                        lng: parseFloat(item.dataset.lng),
                        name: item.dataset.name,
                        countryCode: item.dataset.country
                    });
                    suggestionsEl.classList.remove('active');
                });
            });
        } catch (error) {
            console.error('Location search error:', error);
            suggestionsEl.innerHTML = `
                <div class="location-suggestion-item">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <div class="suggestion-name">Search failed</div>
                        <div class="suggestion-address">Please try again</div>
                    </div>
                </div>
            `;
        }
    }

    selectLocation(location) {
        this.searchLocation = {
            lat: location.lat,
            lng: location.lng,
            name: location.name
        };

        // Update the selected location display
        const selectedEl = document.getElementById('selectedLocation');
        selectedEl.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div class="location-details">
                <div class="location-name">${location.name.split(',').slice(0, 2).join(',')}</div>
                <div class="location-coords">Coordinates: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}</div>
            </div>
            <button class="clear-location" onclick="app.clearCustomLocation()">
                <i class="fas fa-times"></i>
            </button>
        `;
        selectedEl.classList.add('active');

        // Clear the search input
        document.getElementById('locationSearchInput').value = '';

        // Update the search location display
        this.updateSearchLocationDisplay();

        // If we detected a country from the location, suggest updating emergency numbers
        if (location.countryCode && worldwideEmergencyNumbers[location.countryCode]) {
            const countryData = worldwideEmergencyNumbers[location.countryCode];
            this.showToast(`Tip: Select "${countryData.country}" in the dropdown for their emergency numbers`, 'info');
            
            // Auto-select the country in dropdown
            document.getElementById('countrySelect').value = location.countryCode;
        }

        this.showToast(`Location set to: ${location.name.split(',')[0]}`, 'success');
    }

    clearCustomLocation() {
        this.searchLocation = null;
        document.getElementById('selectedLocation').classList.remove('active');
        document.getElementById('selectedLocation').innerHTML = '';
        this.updateSearchLocationDisplay();
    }

    updateSearchLocationDisplay() {
        const nameEl = document.getElementById('searchLocationName');
        if (this.useCustomLocation && this.searchLocation) {
            nameEl.textContent = this.searchLocation.name.split(',').slice(0, 2).join(',');
        } else if (this.useCustomLocation) {
            nameEl.textContent = 'Enter a location above';
        } else {
            nameEl.textContent = 'Your current location';
        }
    }

    getActiveSearchLocation() {
        if (this.useCustomLocation && this.searchLocation) {
            return this.searchLocation;
        }
        return this.currentLocation;
    }
}

// Initialize the app
const app = new FirstAidApp();

// Service Worker Registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added for offline support
        console.log('FirstAid Pro loaded successfully');
    });
}
