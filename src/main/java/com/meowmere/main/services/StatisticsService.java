package com.meowmere.main.services;

import com.meowmere.main.dto.character.preference.PreferenceDTO;
import com.meowmere.main.entities.characters.Character;
import com.meowmere.main.entities.characters.Image;
import com.meowmere.main.entities.characters.Preference;
import com.meowmere.main.repositories.character.CharacterRepository;
import com.meowmere.main.repositories.character.ImageRepository;
import com.meowmere.main.repositories.character.PreferenceRepository;
import com.meowmere.main.utils.UtilsShared;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class StatisticsService {
    @Autowired
    CharacterRepository characterRepository;
    @Autowired
    PreferenceRepository preferenceRepository;
    @Autowired
    ImageRepository imageRepository;

    public ResponseEntity getPreferencesForCharacter(Long charId) {
        List<Preference> preferences = preferenceRepository.getPreferencesForCharacter(charId);
        List<Preference> result = new ArrayList<>();

        HashMap<Long, List<Preference>> preferenceMap = new HashMap<>();
        for (Preference preference : preferences){
            Long uniqueKey = preference.getPreferedCharacter().getExternalId();

            List<Preference> preferenceList = preferenceMap.get(uniqueKey);
            if(preferenceList == null ) {
                preferenceList = new ArrayList<>();
            }
            preferenceList.add(preference);
            preferenceMap.put(uniqueKey, preferenceList);
        }


        for(Map.Entry<Long, List<Preference>> entry : preferenceMap.entrySet()) {
            List<Preference> preferenceList = entry.getValue();
            Preference foundPref = preferenceList.get(0);

            result.add(foundPref);
        }


        ArrayList<PreferenceDTO> preferenceDTOS = new ArrayList<>();
        if(result != null && result.size() > 0) {
            for (Preference preference : result) {
                Character relChar = characterRepository.getOne(preference.getPreferedCharacter().getExternalId());
                if(relChar != null) {
                    PreferenceDTO preferenceDTO = new PreferenceDTO();
                    preferenceDTO.setRange(preference.getRange());

                    String name = relChar.getCharName() != null ? relChar.getCharName() : "?";
                    String surname =  relChar.getCharSurname() != null ? relChar.getCharSurname() : "?";
                    String fullName = name + " " + surname;

                    preferenceDTO.setId(relChar.getExternalId());
                    preferenceDTO.setFullname(fullName);

                    Image image = imageRepository.getProfilePicForCharacter(relChar.getExternalId());
                    String profilePic = null;
                    if(image != null){
                        profilePic = UtilsShared.GetProfilePicBase64Code(image.getExtension(), image.getImage());
                    }
                    preferenceDTO.setProfilePic(profilePic);

                    preferenceDTOS.add(preferenceDTO);
                }

            }
        }

        return new ResponseEntity(preferenceDTOS, HttpStatus.OK);
    }
}
