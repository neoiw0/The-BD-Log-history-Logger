// ==UserScript==
// @name         The BD Log history Logger
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  A legal script only change/add the elements on the page to  make pvp battle easier
// @author       BoriT
// @match        https://www.neopets.com/dome/arena*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

//A legal script only change/add the elements on the page to  make pvp battle easier

//Function:

//0)Show BD log history

//1)Above the battle log,in the black bar, you will see how many times your multi-healers healed.(Make it easier for oneself to follow the DDL(https://www.neopets.com/~yotoive)/EEL(https://www.neopets.com/~EELRules)/OPT(https://www.neopets.com/~Airistole) rules)

//2)If there is a difference on MaxHp of 2 pets, this script helps note the number.The pet with higher health could immediately surrender when their health drops to or below this value, to make it a little more fair.

//3) Hide/display names in your battle log

//-------------

//You may also like this script(also approved in DC): BD Log Fix - https://pastebin.com/raw/6pUtVKf6  , it 1) fix the battle log and 2) tell you when you move second.

var displayPVPInfo=true;//do you want to display MaxHP difference and how many times your multi-healers healed?
var maxTurns=30;//max turns of hitory bd log to save
var logBackgroundColor = "rgba(255, 0, 0, 0)"; // log Background Color
var recordInterval=2;//how many seconds between each (log)recording action
//
var hideYourName=true;//if you just want the log, not like names in it
var yourName2Disply="You"
var hideYourOpponentName=true;//if you just want the log, not like names in it
var opponentName2Disply="Your Opponent"









var weaponIcons = {

    "Snowager Pendant": "https://images.neopets.com/items/bd_snowagerpendant.gif",
     "Cloud Rod": "https://images.neopets.com/items/artifact_cloudrod.gif",
"Obsidian Scorchstone": "https://images.neopets.com/items/9642h0f5l0.gif", "Roxtons Trusty Bowie Knife": "https://images.neopets.com/items/bd_roxtons_lucky_bowie_knife.gif", "Thunder Sticks": "https://images.neopets.com/items/ac_bd_thundersticks.gif", "The Mystical Tablet": "https://images.neopets.com/items/wea_magical_tablet.gif", "Leaded Elemental Vial": "https://images.neopets.com/items/bpo_potion3.gif", "Super Attack Pea": "https://images.neopets.com/items/bd_superpea.gif", "Thyoras Tear": "https://images.neopets.com/items/magic_amuletwater.gif", "Flame Reflectozap": "https://images.neopets.com/items/bd_fire_03.gif", "Wand of the Dark Faerie": "https://images.neopets.com/items/darkfaerie_wand.gif", "Void Blade": "https://images.neopets.com/items/wea_void_scimitar.gif", "Hanso Charisma Charm": "https://images.neopets.com/items/bd_charismacharm_hanso.gif", "Illusens Staff": "https://images.neopets.com/items/earth_staff.gif", "Ghostkerbomb": "https://images.neopets.com/items/bd_ghostkerchief_bomb.gif", "Sword of Reif": "https://images.neopets.com/items/bd_sword_reif.gif", "Rod of Dark Nova": "https://images.neopets.com/items/rod_darknova.gif", "Celebratory Confetti Cannon": "https://images.neopets.com/items/311d853399.gif", "Pretty Negg Shield": "https://images.neopets.com/items/wea_fonY21_negg_shield.gif", "Turned Tooth": "https://images.neopets.com/items/wea_tooth.gif", "Dangerous Maraquan Yo-yo": "https://images.neopets.com/items/bd_ddy18_danger_maraqyoyo.gif", "Varia is the Bomb": "https://images.neopets.com/items/wea_varias_bomb.gif", "Extra Loud Techo Fanatic Megaphone": "https://images.neopets.com/items/bd_techomegaphone.gif", "Moehog Skull": "https://images.neopets.com/items/bd_moehog_skull.gif", "Faerie Tabard": "https://images.neopets.com/items/bd_gold_vine.gif", "Hubrid Nox Memorial Shield": "https://images.neopets.com/items/bd_shield_nox.gif", "Entangling Lenny Lasso": "https://images.neopets.com/items/bd_lenny_lasso.gif",
    "Celebratory Confetti Cannon": "https://images.neopets.com/items/311d853399.gif", "Sword of Lameness": "https://images.neopets.com/items/bd_sword_lameness.gif", "Sword of Ari": "https://images.neopets.com/items/bd_sword_ari.gif", "Seasonal Attack Pea": "https://images.neopets.com/items/seasonal_pea.gif", "Lenny Ray Gun of Freezing": "https://images.neopets.com/items/bd_lenny_freezeray.gif", "Thick Smoke Bomb": "https://images.neopets.com/items/nin_smoke_bomb.gif", "Wanderers Cloak": "https://images.neopets.com/items/bva_cloak_wanderers.gif", "Patched Magic Hat": "https://images.neopets.com/items/bd_hat.gif", "Cobrall Utility Blade": "https://images.neopets.com/items/wea_cobrall_knife.gif", "Superior Reflection Shield": "https://images.neopets.com/items/bd_reflectshield.gif", "Grapes of Wrath": "https://images.neopets.com/items/bd_grapesofwrath.gif", "Mega U-Bend": "https://images.neopets.com/items/bd_water_03.gif", "Bowling Ball of Lost Cities": "https://images.neopets.com/items/wea_lostcitylanes_ball.gif", "Magic Gridlock Gun": "https://images.neopets.com/items/wea_runix_gun.gif", "Kelpbeards Trident": "https://images.neopets.com/items/bd_kelpbeard_trident.gif", "Downsize!": "https://images.neopets.com/items/bd_downsize.gif", "Ancient Lupe Wand": "https://images.neopets.com/items/snowfaerie_wolfwand.gif", "Rusty Pitchfork": "https://images.neopets.com/items/bd_hw_pitchfork_rusty.gif", "Sleep Ray": "https://images.neopets.com/items/sloth_tcg_blaster4.gif", "Ultra Dual Shovel": "https://images.neopets.com/items/bd_earth_03.gif", "Altadorian Swordbreaker": "https://images.neopets.com/items/ala_sword_altadbreak.gif", "Leaf Shield": "https://images.neopets.com/items/earth_leafsheild.gif", "Cursed Elixir": "https://images.neopets.com/items/bd_spookyelixir.gif", "Sword of Thare": "https://images.neopets.com/items/bd_sword_thare.gif", "Water Powered Pistol": "https://images.neopets.com/items/toy_water_gun.gif",
    "Fan of Swords": "https://images.neopets.com/items/bd_fan_swords_ht.gif", "Tyrannian Sceptre": "https://images.neopets.com/items/wea_acy19_tyrsceptre.gif", "Poisonous Mushroom Tea": "https://images.neopets.com/items/bd_mushroom_drink.gif", "Sophies Magic Hat": "https://images.neopets.com/items/bd_sophie_hat.gif", "Kooky Myriad Maker": "https://images.neopets.com/items/c76445m52l.gif", "Yooyu Knuckle Duster": "https://images.neopets.com/items/gif_acy18_knu_duster.gif", "Mayors Top Hat": "https://images.neopets.com/items/bd_mayor_tophat.gif", "Kiko Skull Pirate Hat": "https://images.neopets.com/items/clo_ddy15_kikoskuph.gif", "Sword of Thare": "https://images.neopets.com/items/bd_sword_thare.gif", "Water Powered Pistol": "https://images.neopets.com/items/toy_water_gun.gif", "Molten Boulder": "https://images.neopets.com/items/wea_lava_boulder.gif", "Winged Boomerang": "https://images.neopets.com/items/wea_winged.gif", "Mirror Mote": "https://images.neopets.com/items/mote_mirror.gif", "The Power of Friendship": "https://images.neopets.com/items/bd_power_of_friendship.gif", "Snowager Pendant": "https://images.neopets.com/items/bd_snowagerpendant.gif", "Crisp Blue Tunic": "https://images.neopets.com/items/bva_bluetunic.gif", "Scroll of Ultranova": "https://images.neopets.com/items/bvs_ultranova_scroll.gif", "Blaze": "https://images.neopets.com/items/wea_tge_scimitar.gif", "U-Bend of Great Justice": "https://images.neopets.com/items/bd_water_03.gif", "Pirate Captains Hat": "https://images.neopets.com/items/bd_captain_hat.gif", "Illusens Silver Shield": "https://images.neopets.com/items/bd_illusen_shield.gif", "Shield of Faerieland": "https://images.neopets.com/items/bd_shield_faerieland.gif", "Craftsmans Lens": "https://images.neopets.com/items/coltzan_lens4.gif", "Kings Lens": "https://images.neopets.com/items/coltzan_lens6.gif", "Jade Elixir": "https://images.neopets.com/items/nin_potion_jade.gif",
    "Lucky Robots Foot": "https://images.neopets.com/items/bd_chainclaw.gif", "Triple Turbo Dryer": "https://images.neopets.com/items/bd_air_03.gif", "Heavy Blue Tunic": "https://images.neopets.com/items/arm_blue_robe.gif", "Crystal Plateau Dacardian Shield": "https://images.neopets.com/items/islb_crystalzone_shield.gif", "Flask of Liquid Fire": "https://images.neopets.com/items/bpo_flask_liquidfire.gif", "Parachuting First Aid kit": "https://images.neopets.com/items/wea_ddY21_firstaidkit.gif", "Kacheek Life Potion": "https://images.neopets.com/items/bd_kacheek_lifepotion.gif", "Skarls Sword": "https://images.neopets.com/items/bd_wotc_sword.gif", "Skarls Hasty Mace": "https://images.neopets.com/items/bd_skarl_mace_hasty.gif", "Thistleberry Pingrenade": "https://images.neopets.com/items/wea_berry_knife.gif", "Rejuvenating Jar of Brains": "https://images.neopets.com/items/bd_tyweof2013_brainhealjar.gif", "Freezing Potion": "https://images.neopets.com/items/bd_icepotion.gif", "Studded Leather Cuirass": "https://images.neopets.com/items/ala_studded_cuirass.gif", "Clawed Shield": "https://images.neopets.com/items/bd_wotc_shield.gif", "Dr. Sloths Personal Bath Buddy": "https://images.neopets.com/items/bd_slothduck.gif", "Magical Marbles of Mystery": "https://images.neopets.com/items/marbles_of_doom.gif", "Dr. Sloths Personal Body Armour": "https://images.neopets.com/items/bd_sloth_personal_bodyarmour.gif", "Amulet of Pie": "https://images.neopets.com/items/bd_cake_amulet.gif", "Buckled Leather Tunic": "https://images.neopets.com/items/bva_buckled_leather_tunic.gif", "Solar Flare Shield": "https://images.neopets.com/items/spd_shield_solarflare.gif", "Sword of Skardsen": "https://images.neopets.com/items/eliv_thade_sword.gif", "Shield of Pion Troect": "https://images.neopets.com/items/eliv_thade_shield.gif", "Water Whip": "https://images.neopets.com/items/fon_bd_waterwhip.gif", "Faerie Slingshot": "https://images.neopets.com/items/bd_faerieacornslingshot.gif", "Lupe Wand": "https://images.neopets.com/items/lupewand.gif",
    "Shield of Pion Troect": "https://images.neopets.com/items/eliv_thade_shield.gif", "Water Whip": "https://images.neopets.com/items/fon_bd_waterwhip.gif", "Whirling Mopper": "https://images.neopets.com/items/wea_mopper.gif", "Faerie Slingshot": "https://images.neopets.com/items/bd_faerieacornslingshot.gif", "Jade Scorchstone": "https://images.neopets.com/items/jade_scorchstone.gif", "Ridiculously Heavy Battle Hammer": "https://images.neopets.com/items/bd_heavybattlehammer.gif", "Short Sleeved Yellow Tunic": "https://images.neopets.com/items/arm_yellow_robe.gif", "Lesser Healing Scroll": "https://images.neopets.com/items/bvs_heal2.gif", "Oasis Tonic": "https://images.neopets.com/items/mpo_lp14_tonicoasis.gif", "Heavy Robe of Thievery": "https://images.neopets.com/items/bva_heavyrobe.gif", "Gelert Healing Remedy": "https://images.neopets.com/items/bd_gelert_healing.gif", "Scroll of the Wise": "https://images.neopets.com/items/bvs_scroll_wise.gif", "Salve for the Bruised Petpet": "https://images.neopets.com/items/gro_ddY21_bruised_petpet.gif", "Flaming Blooble Potion": "https://images.neopets.com/items/bpo_potion_flamingbooble.gif", "A Shovel": "https://images.neopets.com/items/bd_tyweof2013_itsashovel.gif", "Amulet of Life": "https://images.neopets.com/items/magic_amuletlife.gif", "Ylanas Blaster": "https://images.neopets.com/items/ros_bd_ylanasblaster.gif", "Virtupets X-514 Super Shield": "https://images.neopets.com/items/bd_space_shield.gif", "Frozen Cyodrake Shield": "https://images.neopets.com/items/bd_frozen_shield_cyodrake.gif", "Everlasting Crystal Apple": "https://images.neopets.com/items/bd_everlastcrystalball.gif", "Golden Pirate Amulet": "https://images.neopets.com/items/bd_smugglers_amulet.gif", "Stone Foam Finger": "https://images.neopets.com/items/bd_acy15vii_stnfmfngr.gif", "Tornado Ring": "https://images.neopets.com/items/tornado_ring.gif", "H4000 Helmet": "https://images.neopets.com/items/bd_h4000_helmet.gif", "Maractite Dimensional Trap": "https://images.neopets.com/items/wea_maractite_trap.gif",
    "Carved Qasalan Blowgun": "https://images.neopets.com/items/bd_qs_blowgun.gif", "Maractite Dimensional Trap": "https://images.neopets.com/items/wea_maractite_trap.gif", "Solar Burrito": "https://images.neopets.com/items/bd_solar_burrito.gif", "Golden Garfir Helm": "https://images.neopets.com/items/ala_helm_goldgarfir.gif", "Sun and Moon Chakram": "https://images.neopets.com/items/bd_gmc2013_sunmoonchak.gif", "Elephante Unguent": "https://images.neopets.com/items/bd_ele_potion.gif", "Randomly Firing Freeze Ray": "https://images.neopets.com/items/bd_freezeray_random.gif", "Ring of the Sway": "https://images.neopets.com/items/bd_tyweof2013_rng_sway.gif", "Pirate Captains Cutlass": "https://images.neopets.com/items/bd_captain_cutluss.gif", "Feel Better Soup": "https://images.neopets.com/items/bd_feel_better_soup.gif", "Sword of Tawre": "https://images.neopets.com/items/bd_sword_tawre.gif", "Slumberberry Potion": "https://images.neopets.com/items/bd_slumberberrypotion.gif", "Icy Chia Goggles": "https://images.neopets.com/items/bd_chia_icegoggles.gif", "Jhudoras Bewitched Ring": "https://images.neopets.com/items/bd_jhudora_ring.gif", "Slippery Floor Potion": "https://images.neopets.com/items/icefloor.gif", "Attack Pea": "https://images.neopets.com/items/bd_attack_pea.gif", "Festive Holiday Scroll": "https://images.neopets.com/items/bvs_advc2012_scroll_bvholi.gif", "Flaming Oven Gloves": "https://images.neopets.com/items/ad_flamingovengloves.gif", "Altador Cup Throwing Star": "https://images.neopets.com/items/bd_acy14vii_ac_throw_star.gif", "Blue Scorchstone": "https://images.neopets.com/items/new_dragonstone_6.gif", "Haunted Skull Fan": "https://images.neopets.com/items/bd_hw_wand_hauntfan.gif", "Ultranova": "https://images.neopets.com/items/ultranova.gif", "Rainbow Scorchstone": "https://images.neopets.com/items/new_dragonstone_9.gif", "Healing Ankh of the Nimmo": "https://images.neopets.com/items/bd_nimmo_healingwand.gif", "Scroll of Knowledge": "https://images.neopets.com/items/bvs_scrollof_knowledge.gif",
    "Golden Compass": "https://images.neopets.com/items/alm_magic_compass.gif", "Vial of Fragrant Oil": "https://images.neopets.com/items/bpo_vial_fragrantoil.gif", "Reflecting Vanities": "https://images.neopets.com/items/clo_dual_reflector.gif", "Platinum Kacheek Shield": "https://images.neopets.com/items/merch_kacheekshield.gif", "Platinum Kougra Shield": "https://images.neopets.com/items/merch_kougrashield.gif", "Flask of Liquid Light": "https://images.neopets.com/items/bpo_flask_liquidlight.gif", "Throwing Cupcakes": "https://images.neopets.com/items/bd_throwing_cupcakes.gif", "Ghostkershield": "https://images.neopets.com/items/bd_ghostkerchief_shield.gif", "Exceptionally Tiny Laser Cannon": "https://images.neopets.com/items/ros_bd_tinylaser.gif", "Potion of Concealment": "https://images.neopets.com/items/camouflage.gif", "Scroll of Disorientation": "https://images.neopets.com/items/wea_scroll_disorientation.gif", "Jetsam Fin Guard": "https://images.neopets.com/items/bd_jetsam_gauntlet.gif", "Lavaball": "https://images.neopets.com/items/toy_lavaball.gif", "Bow of the Hegelob": "https://images.neopets.com/items/shw_hegelob_bow.gif", "Gilded War Hammer": "https://images.neopets.com/items/bd_gildedwarhammer.gif", "Shiny Shoal Shell Shield": "https://images.neopets.com/items/bd_shiny_shell_shield.gif", "Mysterious Hemlock Dart": "https://images.neopets.com/items/battle_superpoisondart.gif", "Dacardian Swords of Valor": "https://images.neopets.com/items/cc_wea_swordsofvalor.gif", "Pocket Lab Ray": "https://images.neopets.com/items/bd_spaceray1.gif", "Stocking Full of Coal": "https://images.neopets.com/items/bd_holiday_coalstocking.gif", "Candy Cane Prison Shank": "https://images.neopets.com/items/wea_candy_shank.gif", "Greater Healing Scroll": "https://images.neopets.com/items/bvs_heal3.gif", "Lutari Battle Shield": "https://images.neopets.com/items/bd_lutari_shield.gif", "Multi Barbed Ice Spear": "https://images.neopets.com/items/bd_barbed_icespear.gif", "Disgruntled Janitors Bucket & Mop": "https://images.neopets.com/items/wea_janitorsmop_bucket.gif",
    "Dacardian Swords of Valor": "https://images.neopets.com/items/cc_wea_swordsofvalor.gif", "Platinum Shoyru Shield": "https://images.neopets.com/items/merch_shoyrushield.gif", "Candy Cane Prison Shank": "https://images.neopets.com/items/wea_candy_shank.gif", "Ghostkershield": "https://images.neopets.com/items/bd_ghostkerchief_shield.gif", "Platinum Kacheek Shield": "https://images.neopets.com/items/merch_kacheekshield.gif", "Amulet of Altador": "https://images.neopets.com/items/bd_amulet_of_altador.gif", "Disgruntled Janitors Bucket & Mop": "https://images.neopets.com/items/wea_janitorsmop_bucket.gif", "Exceptionally Tiny Laser Cannon": "https://images.neopets.com/items/ros_bd_tinylaser.gif", "Scroll of the Fool": "https://images.neopets.com/items/bvs_scroll_fool.gif", "Dual Batons of Katsuo": "https://images.neopets.com/items/wea_dual_batons.gif", "Greater Healing Scroll": "https://images.neopets.com/items/bvs_heal3.gif", "Darigan Muffin": "https://images.neopets.com/items/bd_muffin_darigan.gif", "Blunted Qasalan Gladius Sword": "https://images.neopets.com/items/bd_qs_gladius.gif", "Frozen Water Daggers": "https://images.neopets.com/items/bd_dagger_frzwater.gif", "Scroll Potion": "https://images.neopets.com/items/bpo_potion_scroll.gif", "Scarab Ring": "https://images.neopets.com/items/bd_ring_scarab.gif", "Glittery Faerie Dust": "https://images.neopets.com/items/bd_glittery_faeriedust.gif", "Throwing Cutlass": "https://images.neopets.com/items/bd_gmc_cutlass_throwing.gif", "Jhudoras Crystal Ball": "https://images.neopets.com/items/artifact_jhudoras_ball.gif", "Ghostkersword": "https://images.neopets.com/items/bd_ghostkerchief_sword.gif", "The Death Knell": "https://images.neopets.com/items/bg_death_knell.gif", "Robot Muffin": "https://images.neopets.com/items/bd_muffin_robot.gif", "Barbat Throwing Star": "https://images.neopets.com/items/bd_barbat_star.gif", "Sword of Thigl": "https://images.neopets.com/items/bd_sword_thigl.gif", "Nebula Force Field Generator": "https://images.neopets.com/items/spd_gener_nebforce.gif",
    "Nebula Force Field Generator": "https://images.neopets.com/items/spd_gener_nebforce.gif", "Barbat Throwing Star": "https://images.neopets.com/items/bd_barbat_star.gif", "Sword of Thigl": "https://images.neopets.com/items/bd_sword_thigl.gif", "Scroll of Three Curses": "https://images.neopets.com/items/bvs_scroll_threecurse.gif", "Rainbow Scroll": "https://images.neopets.com/items/bvs_rainbow_scroll.gif", "Sword of White Lies": "https://images.neopets.com/items/bd_sword_whitelies.gif", "Glittery Scorchstone": "https://images.neopets.com/items/glittery_scorchstone.gif", "Tower Shield": "https://images.neopets.com/items/bd_bfm_tower_shield.gif", "Chia Flour": "https://images.neopets.com/items/artifact_chiaflour.gif", "Fiery Sun Scroll": "https://images.neopets.com/items/bvs_sun_magic.gif", "Blanking Ray": "https://images.neopets.com/items/bd_blanking_ray.gif", "Spyder Stone Necklace": "https://images.neopets.com/items/bd_necklace_spyderstone.gif", "Shining Celesta Sword": "https://images.neopets.com/items/wea_celesta_sword.gif", "Gemmed Sword of Light": "https://images.neopets.com/items/bd_sword_gems.gif", "Hobans Hat": "https://images.neopets.com/items/cgp_hobans_hat.gif", "Sword of the Dead": "https://images.neopets.com/items/bd_haunted_sword.gif", "Bubble Wands": "https://images.neopets.com/items/wea_bubble_wands.gif", "Pike Pike": "https://images.neopets.com/items/bd_pike_pike.gif", "Rancid Battle Dung": "https://images.neopets.com/items/bd_rancid_dung.gif", "Geraptiku Attack Leaf": "https://images.neopets.com/items/bd_reissued_leaf.gif", "Corrosive Spear Wand": "https://images.neopets.com/items/wea_poisonous_spear.gif", "Ring of the Lost": "https://images.neopets.com/items/ldpp_ringofthelost.gif", "Iron Lupe Helm": "https://images.neopets.com/items/bd_lupe_helmet.gif", "Jhudoras Cursed Sword": "https://images.neopets.com/items/bd_jhudora_cursedsword.gif", "Brynns Legendary Sword of Wraith Smiting": "https://images.neopets.com/items/bd_sword_brynnrep.gif",
    "Hubrids Puzzle Box": "https://images.neopets.com/items/artifact_nox_box1.gif", "Brain Muffin": "https://images.neopets.com/items/bd_muffin_brain.gif", "Jhudoras Wand": "https://images.neopets.com/items/bd_jhudora_wandx.gif", "Mysterious Red Potion": "https://images.neopets.com/items/pot_ddY21_red_potion.gif", "Thrown Slushie Cup": "https://images.neopets.com/items/bd_acy15vii_throsluscup.gif", "Winged Scarab": "https://images.neopets.com/items/bd_desert_wing.gif", "Lair Beast Tooth Shield": "https://images.neopets.com/items/bd_tooth_shield.gif", "Icy Muffin": "https://images.neopets.com/items/bd_ice_muffin.gif", "Dung Catapult": "https://images.neopets.com/items/artifact_dungcannon.gif", "Pyon Stinger Mace": "https://images.neopets.com/items/bd_mace_pyon.gif", "Hubrids Odial Sphere": "https://images.neopets.com/items/bd_odialsphere.gif", "Shuriken": "https://images.neopets.com/items/shw_shuriken.gif", "Thunderbolt": "https://images.neopets.com/items/wea_thunderbolt.gif", "Fitted Velvet Cloak": "https://images.neopets.com/items/bva_cloak_darkfit.gif", "Ugga Loaf of Meat": "https://images.neopets.com/items/foo_ddY21_loafofmeat.gif", "Green Frost Cannon": "https://images.neopets.com/items/greenfrostcannon.gif", "Bleached Bone Staff": "https://images.neopets.com/items/bd_hw_staff_bleachbone.gif", "Weapon Formerly Known As Desert Axe Weapon": "https://images.neopets.com/items/wea_y18gmc_desert_axewea.gif", "Terror Stone": "https://images.neopets.com/items/magic_amuletfear.gif", "Castle Defenders Shield": "https://images.neopets.com/items/castledefender_shield.gif", "Fake von Roo Fangs": "https://images.neopets.com/items/bd_vonroofangs.gif", "Flotsam Ice Shell": "https://images.neopets.com/items/bd_flotsam_bluepower.gif", "Merciless Idiom": "https://images.neopets.com/items/wea_thruster.gif", "Jhudoras Dark Collar": "https://images.neopets.com/items/darkfaerie_jeweledcollar.gif", "Flaming Bronze Helm": "https://images.neopets.com/items/bd_bronzehelm.gif",
    "Shuriken": "https://images.neopets.com/items/shw_shuriken.gif", "Ugga Loaf of Meat": "https://images.neopets.com/items/foo_ddY21_loafofmeat.gif", "Bleached Bone Staff": "https://images.neopets.com/items/bd_hw_staff_bleachbone.gif", "Fake von Roo Fangs": "https://images.neopets.com/items/bd_vonroofangs.gif", "Bag of Healing Dust": "https://images.neopets.com/items/alm_magic_pouch.gif", "Ice Shard Bow": "https://images.neopets.com/items/hf66acigk1.gif", "Steaming Skeem Potion": "https://images.neopets.com/items/bpo_potion_skeem.gif", "Oversized Maractite Rune Sword": "https://images.neopets.com/items/bd_maractite_ossword.gif", "Blazing Embers": "https://images.neopets.com/items/wea_blazing_coal_sword.gif", "Flotsam Ice Shell": "https://images.neopets.com/items/bd_flotsam_bluepower.gif", "Korbats Lab Potion": "https://images.neopets.com/items/merch_korbatlabpotion.gif", "Fitted Velvet Cloak": "https://images.neopets.com/items/bva_cloak_darkfit.gif", "Gruesome Skeith Lunch Box": "https://images.neopets.com/items/bd_skeith_lunchbox.gif", "Fiendish Key": "https://images.neopets.com/items/wea_fiendish_key.gif", "Jhudoras Dark Collar": "https://images.neopets.com/items/darkfaerie_jeweledcollar.gif", "Icy Muffin": "https://images.neopets.com/items/bd_ice_muffin.gif", "Ivy Laced Cloak": "https://images.neopets.com/items/bva_cloak_ivy_laced.gif", "Holiday Memories": "https://images.neopets.com/items/bd_holiday_memories.gif", "Fierce Grarrl Helmet": "https://images.neopets.com/items/bd_grarrl_steelhelmet.gif", "Snowager Sword": "https://images.neopets.com/items/bd_sword_snowager.gif", "Sword of Malum": "https://images.neopets.com/items/wea_malum_sword.gif", "Scroll of the Earth": "https://images.neopets.com/items/bvs_earth_scroll.gif", "Dacardite Scorchstone": "https://images.neopets.com/items/3k5l8k8003.gif", "Bow of Destiny": "https://images.neopets.com/items/bd_nq2_destiny_bow.gif", "Noxious Carrot Blade": "https://images.neopets.com/items/bd_noxiouscarrotblade.gif",
    "Noxious Carrot Blade": "https://images.neopets.com/items/bd_noxiouscarrotblade.gif", "Makeshift Ships Hammer": "https://images.neopets.com/items/jli_bd_makeshifthammer.gif", "Wand of Reality": "https://images.neopets.com/items/bd_nq2_reality_wand.gif", "Earthen Scorchstone": "https://images.neopets.com/items/new_dragonstone_5.gif", "Blumaroo Health Potion": "https://images.neopets.com/items/bd_blumaroo_bouncepotion.gif", "Smelly Dung Muffin": "https://images.neopets.com/items/bd_muffin_dung.gif", "Fearsome Gladius": "https://images.neopets.com/items/ala_gladius_fear.gif", "Energy Blaster": "https://images.neopets.com/items/spb_blaster_energy.gif", "Enchanted Kiko Squeeze Toy": "https://images.neopets.com/items/toy_kikosqueeze.gif", "Meukas Snot Trail": "https://images.neopets.com/items/bd_meuka_whip.gif", "Scroll of Freezing": "https://images.neopets.com/items/bvs_freeze.gif", "Potion of Healing": "https://images.neopets.com/items/pot_twr_potenthealing.gif", "Poison Dart": "https://images.neopets.com/items/battle_poisondart.gif", "Wheatgrass Juice": "https://images.neopets.com/items/hfo_twr_wheatgrassjuice.gif", "Wraith Scroll": "https://images.neopets.com/items/bvs_wraith.gif", "Skarls Amulet": "https://images.neopets.com/items/bd_skarrl_amulet.gif", "Scamander Shield": "https://images.neopets.com/items/scamander_shield.gif", "Shooting Star Muffin": "https://images.neopets.com/items/bd_muffin_shootingstar.gif", "Scroll of Forgotten Promises": "https://images.neopets.com/items/bvs_scroll_forgottenpromises.gif", "Kaylas Hat": "https://images.neopets.com/items/bd_kayla_hat.gif", "Ultra Dark Reflectorb": "https://images.neopets.com/items/bd_dark_02.gif", "Ultimate Dark Reflectorb": "https://images.neopets.com/items/bd_dark_03.gif", "Chakram of the Air Faerie": "https://images.neopets.com/items/bd_faerie_chakramair.gif", "Worn Tuskaninny Shoulder Guard": "https://images.neopets.com/items/bd_tuskaninny_shoulderguard.gif", "Ice Dice": "https://images.neopets.com/items/artifact_icedice.gif",
    "Bent Fork": "https://images.neopets.com/items/bent_fork.gif", "Dangerous Dodgeball": "https://images.neopets.com/items/bd_ddy18_dangerdodgeball.gif", "Spearmint": "https://images.neopets.com/items/bd_spearmint.gif", "Jhudoras Potion": "https://images.neopets.com/items/darkfaerie_potion1.gif", "Electro Sword": "https://images.neopets.com/items/bd_electric_sword.gif", "Ancient Negg Amulet": "https://images.neopets.com/items/bd_fony14_negg_amulet.gif", "Glowing Cauldron": "https://images.neopets.com/items/bd_spookycauldron.gif", "Water Muffin": "https://images.neopets.com/items/bd_muffin_water.gif", "Volleyball on Fire": "https://images.neopets.com/items/bd_ddy18_volleyballfire.gif", "Cybunny X Ray Glasses": "https://images.neopets.com/items/bd_cybunny_rayglasses.gif", "Scuzzys Comb": "https://images.neopets.com/items/bd_nq2_scuzzy_comb.gif", "Lightning in a Bottle": "https://images.neopets.com/items/bpo_lightning.gif", "Smugglers Treasure Chest": "https://images.neopets.com/items/bd_smugglers_chest.gif", "Brain Of Mirgle": "https://images.neopets.com/items/pot_spooky_brain.gif", "Maractite Bomb": "https://images.neopets.com/items/bd_maractite_bomb.gif", "Yooyuball Goal Net Shield": "https://images.neopets.com/items/bd_shield_goalnet.gif", "Starry Battle Dung": "https://images.neopets.com/items/bd_starry_dung.gif", "Ultra Bubble Gun": "https://images.neopets.com/items/bd_ultabubblegun.gif", "Alien Aisha Scrambler": "https://images.neopets.com/items/bd_alienaisha_1.gif", "Maractite Water Cannon": "https://images.neopets.com/items/mbd_cannon_underwater.gif", "Spiked Skeith Boomerang": "https://images.neopets.com/items/bd_skeith_boomerang.gif", "Rusty Lamppost": "https://images.neopets.com/items/hwpp_rustylampost.gif", "Scroll of the Battlefield": "https://images.neopets.com/items/bvs_thebattlefield.gif", "Meerca Mesh Net": "https://images.neopets.com/items/bd_meerca_net.gif", "Hand Painted Scarab": "https://images.neopets.com/items/bat_desert_scarab.gif",
    "Cloak of the Deep Forest": "https://images.neopets.com/items/bd_deepforest_cloak.gif", "Royal Blue Cape": "https://images.neopets.com/items/bva_royalblue_cape.gif", "Bottled Holiday Cheer": "https://images.neopets.com/items/med_advc17_hol_cheer.gif", "Sword of the Air Faerie": "https://images.neopets.com/items/bd_airfaesword.gif", "Spiked Skeith Boomerang": "https://images.neopets.com/items/bd_skeith_boomerang.gif", "Portable Cloud": "https://images.neopets.com/items/darkfaerie_portablecloud.gif", "Rusty Lamppost": "https://images.neopets.com/items/hwpp_rustylampost.gif", "Sinsis Crown": "https://images.neopets.com/items/bd_ixiscrown.gif", "Full Uni Armour": "https://images.neopets.com/items/bd_fullarmour_uni.gif", "Meerca Mesh Net": "https://images.neopets.com/items/bd_meerca_net.gif", "Hand Painted Scarab": "https://images.neopets.com/items/bat_desert_scarab.gif", "Yooyuball Goal Net Shield": "https://images.neopets.com/items/bd_shield_goalnet.gif", "Sroom Fruit Potion": "https://images.neopets.com/items/bpo_potion_sreemelixir.gif", "Claw Gloves": "https://images.neopets.com/items/gif_acy18_glovclaw.gif", "Full Krawk Armour": "https://images.neopets.com/items/bd_fullarmour_krawk.gif", "Mask of Coltzan": "https://images.neopets.com/items/bd_desert_deathmask.gif", "Ultra Bubble Gun": "https://images.neopets.com/items/bd_ultabubblegun.gif", "Shield of Soaring": "https://images.neopets.com/items/bd_eagleshield.gif", "Instant Invisible Armour Potion": "https://images.neopets.com/items/bpo_potion_armour.gif", "Starry Battle Dung": "https://images.neopets.com/items/bd_starry_dung.gif", "Faerie Shield": "https://images.neopets.com/items/faerie_shield.gif", "Honey Potion": "https://images.neopets.com/items/earth_faerie_honeypotion.gif", "Rod of Supernova": "https://images.neopets.com/items/wand_supernova.gif", "Scroll of the Battlefield": "https://images.neopets.com/items/bvs_thebattlefield.gif", "Full Lupe Armour": "https://images.neopets.com/items/bd_lupe_fullarmour.gif",
    "Mask of Coltzan": "https://images.neopets.com/items/bd_desert_deathmask.gif", "Full Uni Armour": "https://images.neopets.com/items/bd_fullarmour_uni.gif", "Royal Blue Cape": "https://images.neopets.com/items/bva_royalblue_cape.gif", "Dark Faerie Cloud Racer Helmet": "https://images.neopets.com/items/bd_gmc_faerie_cloud_helm.gif", "Trishulatops": "https://images.neopets.com/items/wea_trishulatops.gif", "Ultimate Negg Hammer": "https://images.neopets.com/items/bd_fony14_negg_hammer.gif", "Maractite Water Cannon": "https://images.neopets.com/items/mbd_cannon_underwater.gif", "Double Dryer": "https://images.neopets.com/items/bd_air_02.gif", "Mystical White Cloak": "https://images.neopets.com/items/alm_cloak_white.gif", "Amulet of Inevitable Betrayal": "https://images.neopets.com/items/bd_haunted_amulet.gif", "Ice Mote": "https://images.neopets.com/items/magic_mote_ice.gif", "Ramtors Spellbook": "https://images.neopets.com/items/bd_nq2_ramtor_book.gif", "Radioactive Muffin": "https://images.neopets.com/items/bd_muffin_glow.gif", "Instant Invisible Armour Potion": "https://images.neopets.com/items/bpo_potion_armour.gif", "Fire Jug": "https://images.neopets.com/items/fire.gif", "Rusty Lamppost": "https://images.neopets.com/items/hwpp_rustylampost.gif", "Shield of Soaring": "https://images.neopets.com/items/bd_eagleshield.gif", "Honey Potion": "https://images.neopets.com/items/earth_faerie_honeypotion.gif", "Rod of Supernova": "https://images.neopets.com/items/wand_supernova.gif", "Faerie Shield": "https://images.neopets.com/items/faerie_shield.gif", "Sword of the Air Faerie": "https://images.neopets.com/items/bd_airfaesword.gif", "Lord Darigans Jewel": "https://images.neopets.com/items/bigbadguy_jewel.gif", "Portable Cloud": "https://images.neopets.com/items/darkfaerie_portablecloud.gif", "Sinsis Crown": "https://images.neopets.com/items/bd_ixiscrown.gif", "Ruby Elixir": "https://images.neopets.com/items/nin_potion_ruby.gif",
    "Ancient Gnarled Wand": "https://images.neopets.com/items/bd_hw_wand_ancientgnarled.gif", "Yoyo Bomb": "https://images.neopets.com/items/bd_yoyo_bomb.gif", "Fire Muffin": "https://images.neopets.com/items/bd_muffin_fire.gif", "Shovel Plus": "https://images.neopets.com/items/bd_earth_02.gif", "Turbo Flame Reflector": "https://images.neopets.com/items/bd_fire_02.gif", "Fiery Battle Duck": "https://images.neopets.com/items/bd_flamingduck.gif", "Sloth Approved Hair Gel": "https://images.neopets.com/items/bd_sloth_hairgel.gif", "Flotato Gloves": "https://images.neopets.com/items/gadgadsprize1.gif", "Golden Peophin Harp": "https://images.neopets.com/items/bd_peophin_goldenharp.gif", "Helm of Recovery": "https://images.neopets.com/items/shw_helmetofrecovery.gif", "Full Cybunny Armour": "https://images.neopets.com/items/full_armour_cybunny.gif", "Bottled Scorchio Breath": "https://images.neopets.com/items/bd_scorchiobreath.gif", "Ethereal Sword": "https://images.neopets.com/items/bd_ghost_sword.gif", "Dark Faerie Bow": "https://images.neopets.com/items/bd_bow_dark_faerie.gif", "Poison Tipped Dagger": "https://images.neopets.com/items/bd_poisondagger.gif", "Trusty Hand Cannon": "https://images.neopets.com/items/bd_handy_cannon.gif", "Floud Bomb": "https://images.neopets.com/items/bd_floud_bomb.gif", "Porcelain Hair Sticks": "https://images.neopets.com/items/bd_hairsticks.gif", "Radiant Illusen Shield": "https://images.neopets.com/items/bd_illusen_radiantshield.gif", "Full Zafara Armour": "https://images.neopets.com/items/bd_fullarmour_zafara.gif", "Cloudy Wand of Storms": "https://images.neopets.com/items/bd_wand_storm.gif", "Bzzt Blaster": "https://images.neopets.com/items/sloth_tcg_blaster2.gif", "Full Scorchio Armour": "https://images.neopets.com/items/bd_scorchio_fullarmour.gif", "Ya Tchea Fruit Bomb": "https://images.neopets.com/items/bd_tchea_bomb.gif", "Ghostly Jetsam Sword": "https://images.neopets.com/items/bd_hw_sword_jetsam.gif",
    "Trusty Hand Cannon": "https://images.neopets.com/items/bd_handy_cannon.gif", "Starlight Potion": "https://images.neopets.com/items/starlight.gif", "Twisted Dark Dagger": "https://images.neopets.com/items/bd_dagger_twisteddark.gif", "Ghostly Jetsam Sword": "https://images.neopets.com/items/bd_hw_sword_jetsam.gif", "Ya Tchea Fruit Bomb": "https://images.neopets.com/items/bd_tchea_bomb.gif", "Jhudoras Vile Vial": "https://images.neopets.com/items/bpo_jhud_vilevial.gif", "Battle Faerie Dagger": "https://images.neopets.com/items/bd_battlefaerie_dagger.gif", "Portable Kiln": "https://images.neopets.com/items/artifact_kiln.gif", "Ethereal Sword": "https://images.neopets.com/items/bd_ghost_sword.gif", "Radiant Illusen Shield": "https://images.neopets.com/items/bd_illusen_radiantshield.gif", "Floud Bomb": "https://images.neopets.com/items/bd_floud_bomb.gif", "Full Cybunny Armour": "https://images.neopets.com/items/full_armour_cybunny.gif", "Golden Peophin Harp": "https://images.neopets.com/items/bd_peophin_goldenharp.gif", "Full Zafara Armour": "https://images.neopets.com/items/bd_fullarmour_zafara.gif", "Staff of Devilish Laughter": "https://images.neopets.com/items/wea_staff_devilish_laughter.gif", "Spiked Negg Mace": "https://images.neopets.com/items/bd_fony15_spiked_neggmace.gif", "Werelupe Claw Necklace": "https://images.neopets.com/items/bd_werelupeclaw.gif", "Full Buzz Armour": "https://images.neopets.com/items/bd_buzz_fullarmour.gif", "Dagger of the Desert": "https://images.neopets.com/items/bd_dagger_of_desert.gif", "Scroll of the Scholar": "https://images.neopets.com/items/bvs_scroll_scholar.gif", "Air Faerie Crown": "https://images.neopets.com/items/bd_wotc_crown.gif", "Purple Sticky Hand": "https://images.neopets.com/items/bd_purple_stickyhand.gif", "The Bringer Plushie": "https://images.neopets.com/items/bd_bringer_plushie.gif", "Zombie Fist on a Stick": "https://images.neopets.com/items/bd_zombie_fist_stick.gif", "Snotty Bow": "https://images.neopets.com/items/bd_snotty_bow.gif",
    "Kaylas Magic Cloak": "https://images.neopets.com/items/bd_kayla_cloak.gif", "Lord Kass Slingshot": "https://images.neopets.com/items/bd_kassslingshot.gif", "Mystical Fish Lobber": "https://images.neopets.com/items/bd_fishlobber.gif", "Zombie Fist on a Stick": "https://images.neopets.com/items/bd_zombie_fist_stick.gif", "Mega Cabbage": "https://images.neopets.com/items/bd_megacab.gif", "Ring of Weightlessness": "https://images.neopets.com/items/bd_ringofweightlessness.gif", "Galems Cloak": "https://images.neopets.com/items/bd_tyweof2013_cloakgalems.gif", "Worn Leather Shield": "https://images.neopets.com/items/bd_leather_worn_shield.gif", "Full Tonu Armour": "https://images.neopets.com/items/bd_tonu_fullarmour.gif", "Goo Blaster": "https://images.neopets.com/items/sloth_tcg_blaster5.gif", "Sword of Apocalypse": "https://images.neopets.com/items/bd_nq2_apocolypse_sword.gif", "Full Gelert Armour": "https://images.neopets.com/items/bd_gelert_fullarmour.gif", "Minor Healing Scroll": "https://images.neopets.com/items/bvs_heal1.gif", "Rainbow Clockwork Grundo": "https://images.neopets.com/items/art_rainbowgrundo.gif", "Pocket Cooking Pot": "https://images.neopets.com/items/bd_pocket_pot.gif", "Venomous Potion": "https://images.neopets.com/items/pot_ddy18_venomous_potion.gif", "Neutralising Ray": "https://images.neopets.com/items/bd_space_neutralizer.gif", "Full Kau Armour": "https://images.neopets.com/items/bd_kau_fullarmour.gif", "Vial of the Deep Forest": "https://images.neopets.com/items/pot_ddy15_viadeepfor.gif", "Downsize Power Plus": "https://images.neopets.com/items/bd_downsize.gif", "Fungus Ray": "https://images.neopets.com/items/spa_booby_gun.gif", "Garoo Elite Blaster": "https://images.neopets.com/items/sloth_tcg_blaster1.gif", "Evil Muffin": "https://images.neopets.com/items/bd_muffin_evil.gif", "Brilliant Wing Amulet": "https://images.neopets.com/items/alm_wind_amulet.gif", "Magical Wheel Potion": "https://images.neopets.com/items/bpo_potion_wheel.gif",
    "Jewelled Peophin Face Mask": "https://images.neopets.com/items/jewelfacemask.gif", "Basic Shield of Flight": "https://images.neopets.com/items/bd_flyingshield.gif", "Full Ixi Armour": "https://images.neopets.com/items/bd_ixi_fullarmour.gif", "Neutralising Ray": "https://images.neopets.com/items/bd_space_neutralizer.gif", "Bronze Scorchstone": "https://images.neopets.com/items/new_dragonstone_2.gif", "Winged Palm Blade": "https://images.neopets.com/items/wea_winged_palm_blade.gif", "Earth Faerie Bow": "https://images.neopets.com/items/bd_earthfaerie_bow.gif", "Full Tonu Armour": "https://images.neopets.com/items/bd_tonu_fullarmour.gif", "Dull Stone Axe": "https://images.neopets.com/items/bd_wotc_axe.gif", "Magical Wheel Potion": "https://images.neopets.com/items/bpo_potion_wheel.gif", "Kaylas Magic Cloak": "https://images.neopets.com/items/bd_kayla_cloak.gif", "Mega Cabbage": "https://images.neopets.com/items/bd_megacab.gif", "Goo Blaster": "https://images.neopets.com/items/sloth_tcg_blaster5.gif", "Downsize Power Plus": "https://images.neopets.com/items/bd_downsize.gif", "Evil Muffin": "https://images.neopets.com/items/bd_muffin_evil.gif", "Bow of the Air Faerie": "https://images.neopets.com/items/bd_bow_air_faerie.gif", "Lord Kass Slingshot": "https://images.neopets.com/items/bd_kassslingshot.gif", "Fungus Ray": "https://images.neopets.com/items/spa_booby_gun.gif", "Minor Healing Scroll": "https://images.neopets.com/items/bvs_heal1.gif", "Forest Cloak": "https://images.neopets.com/items/battle_hoodcloak.gif", "Phial of the Dreamer": "https://images.neopets.com/items/alm_phial_dreamer.gif", "Pocket Cooking Pot": "https://images.neopets.com/items/bd_pocket_pot.gif", "Zombie Fist on a Stick": "https://images.neopets.com/items/bd_zombie_fist_stick.gif", "Villager Pitchfork": "https://images.neopets.com/items/hwpp_villager_pitchfork.gif", "Rainbow Clockwork Grundo": "https://images.neopets.com/items/art_rainbowgrundo.gif",
    "Serrated Tooth Shield": "https://images.neopets.com/items/bd_hw_tooth_shield.gif", "Worn Leather Shield": "https://images.neopets.com/items/bd_leather_worn_shield.gif", "Basic Shield of Flight": "https://images.neopets.com/items/bd_flyingshield.gif", "Quill Sword": "https://images.neopets.com/items/bd_gmc_quillsword.gif", "Neutralising Ray": "https://images.neopets.com/items/bd_space_neutralizer.gif", "Bronze Scorchstone": "https://images.neopets.com/items/new_dragonstone_2.gif", "Lord Kass Slingshot": "https://images.neopets.com/items/bd_kassslingshot.gif", "Mega Cabbage": "https://images.neopets.com/items/bd_megacab.gif", "Sword of Apocalypse": "https://images.neopets.com/items/bd_nq2_apocolypse_sword.gif", "Kaylas Magic Cloak": "https://images.neopets.com/items/bd_kayla_cloak.gif", "Downsize Power Plus": "https://images.neopets.com/items/bd_downsize.gif", "Evil Muffin": "https://images.neopets.com/items/bd_muffin_evil.gif", "Kazeriu Whip": "https://images.neopets.com/items/shw_whip_kazeriu.gif", "Vial of the Deep Forest": "https://images.neopets.com/items/pot_ddy15_viadeepfor.gif", "Forest Cloak": "https://images.neopets.com/items/battle_hoodcloak.gif", "Snotty Bow": "https://images.neopets.com/items/bd_snotty_bow.gif", "Homing Mine": "https://images.neopets.com/items/bd_ddy18_homingmine.gif", "The Bringer Plushie": "https://images.neopets.com/items/bd_bringer_plushie.gif", "Hawk Bracelet": "https://images.neopets.com/items/snowfaerie_hawkbracelet.gif", "Unnerving Hat": "https://images.neopets.com/items/bd_hat_unnerving.gif", "Faerie Healing Dust": "https://images.neopets.com/items/bd_ddy18_faerieheal.gif", "Titanium Poogle Teeth": "https://images.neopets.com/items/bd_poogle_titaniumteeth.gif", "Superior Battle Plunger": "https://images.neopets.com/items/bd_chia_plunge.gif", "Full Lutari Armour": "https://images.neopets.com/items/bd_lutari_fullarmor.gif", "Frozen Leaf Shuriken": "https://images.neopets.com/items/bd_shuriken_frzleaf.gif",
    "Bronze Scorchstone": "https://images.neopets.com/items/new_dragonstone_2.gif", "Kau Knight Helmet": "https://images.neopets.com/items/bd_kau_knighthelmet.gif", "Acid Coating": "https://images.neopets.com/items/bd_acidcoating.gif", "Full Tonu Armour": "https://images.neopets.com/items/bd_tonu_fullarmour.gif", "Villager Pitchfork": "https://images.neopets.com/items/hwpp_villager_pitchfork.gif", "Hubrids Noxious Blade": "https://images.neopets.com/items/artifact_nox_sword.gif", "Velms Healing Potion": "https://images.neopets.com/items/bd_nq2_velm_potion.gif", "Purple Hooded Robe": "https://images.neopets.com/items/arm_purple_robe.gif", "Destruct-o-Match III Destroyer": "https://images.neopets.com/items/wea_ddY21_destruct_destroyer.gif", "King Kelpbeards Blessing": "https://images.neopets.com/items/bd_kelpbeard_blessing.gif", "Yoyo of Death": "https://images.neopets.com/items/bd_yoyo_ofdeath.gif", "Floral Battle Dung": "https://images.neopets.com/items/bd_advc2012_dung_floral.gif", "Pale Elixir": "https://images.neopets.com/items/potion39.gif", "Dusty Magic Broom": "https://images.neopets.com/items/bd_broom.gif", "Psellias Fighting Fan": "https://images.neopets.com/items/bd_airfaerie_purplefan.gif", "Snowglobe Staff": "https://images.neopets.com/items/snowfaerie_snowglobestaff.gif", "Expert Lens": "https://images.neopets.com/items/coltzan_lens2.gif", "Amulet of the Sun": "https://images.neopets.com/items/alm_amulet_sun.gif", "Full JubJub Armour": "https://images.neopets.com/items/full_armour_jubjub.gif", "Lucky Uni Charm": "https://images.neopets.com/items/bd_uni_healingstone.gif", "Super U-Bend": "https://images.neopets.com/items/bd_water_02.gif", "Bag of Lenny Healing Seeds": "https://images.neopets.com/items/bd_lenny_healingseed.gif", "Decorative Maractite Sword": "https://images.neopets.com/items/bd_maractite_sword.gif", "Squishy Shoyru Healing Stone": "https://images.neopets.com/items/bd_shoyru_healingstone.gif", "Focus of Imminent Destruction": "https://images.neopets.com/items/bd_focus_destruction.gif",
    "Full Usul Armour": "https://images.neopets.com/items/full_armour_usul.gif", "Poison Snowball": "https://images.neopets.com/items/snowball_2.gif", "Claw of the Ancient Bori": "https://images.neopets.com/items/bd_bori_ancientclaw.gif", "Dung Shield": "https://images.neopets.com/items/bd_shield_dung.gif", "Ornament Launcher": "https://images.neopets.com/items/bd_adca2014_ornlauncr.gif", "Life Giver": "https://images.neopets.com/items/magic_amuletwateroflife.gif", "Halo of Devilpuss": "https://images.neopets.com/items/bd_nq2_devilpuss_halo.gif", "Full Yurble Armour": "https://images.neopets.com/items/yurble_bd_bodyarmor.gif", "Full Eyrie Armour": "https://images.neopets.com/items/bd_eyrie_fullarmour.gif", "Full Moehog Armour": "https://images.neopets.com/items/bd_moehog_fullarmour.gif", "Rainbow Sticky Hand": "https://images.neopets.com/items/bd_rainbowstickyhand.gif", "Full Ruki Armour": "https://images.neopets.com/items/bd_ruki_fullarmour.gif", "Stone Club": "https://images.neopets.com/items/bd_tyr_club.gif", "Cursed Wand of Shadow": "https://images.neopets.com/items/bd_wand_shadow.gif", "17-Pound Trout": "https://images.neopets.com/items/bd_17_pound_trout.gif", "Wheel Shield": "https://images.neopets.com/items/bd_stw_wheelshield.gif", "Golden Qasalan Chestpiece": "https://images.neopets.com/items/bd_qasala_armor.gif", "Gelert Lightning Speed Boots": "https://images.neopets.com/items/gelertfullarmor.gif", "Diamond Snowball": "https://images.neopets.com/items/bd_snowball_diamond.gif", "Gold Handled Short Sword": "https://images.neopets.com/items/ala_sword_3.gif", "Ancient Eyrie Battle Mask": "https://images.neopets.com/items/bd_eyrie_emask.gif", "Ancient Eyrie Crest Shield": "https://images.neopets.com/items/bd_eyrie_eshield.gif", "Yellow Clockwork Lupe": "https://images.neopets.com/items/bd_lupe_clockwork.gif", "Full Gnorbu Armour": "https://images.neopets.com/items/bd_gnorbu_fullarmour.gif", "Jittery Jipple Pear Potion": "https://images.neopets.com/items/bpo_potion_jipple.gif",
    "Yellow Clockwork Lupe": "https://images.neopets.com/items/bd_lupe_clockwork.gif", "Ancient Eyrie Crest Shield": "https://images.neopets.com/items/bd_eyrie_eshield.gif", "Ancient Eyrie Battle Mask": "https://images.neopets.com/items/bd_eyrie_emask.gif", "Gold Handled Short Sword": "https://images.neopets.com/items/ala_sword_3.gif", "Diamond Snowball": "https://images.neopets.com/items/bd_snowball_diamond.gif", "Gelert Lightning Speed Boots": "https://images.neopets.com/items/gelertfullarmor.gif", "Golden Qasalan Chestpiece": "https://images.neopets.com/items/bd_qasala_armor.gif", "Wheel Shield": "https://images.neopets.com/items/bd_stw_wheelshield.gif", "17-Pound Trout": "https://images.neopets.com/items/bd_17_pound_trout.gif", "Cursed Wand of Shadow": "https://images.neopets.com/items/bd_wand_shadow.gif", "Haunted Shield": "https://images.neopets.com/items/bd_scaryshield.gif", "Holiday Nova": "https://images.neopets.com/items/mag_adca2014_holino.gif", "Chomby Slingshot": "https://images.neopets.com/items/bd_chomby_slingshot.gif", "Scroll of Three Wishes": "https://images.neopets.com/items/bvs_scroll_threewish.gif", "Greater Air Potion": "https://images.neopets.com/items/bpo_potion_greater_air.gif", "Greater Water Potion": "https://images.neopets.com/items/bpo_potion_greater_water.gif", "Ultimate Negg of Destruction": "https://images.neopets.com/items/bd_fony14_negg_ultimate.gif", "Golden Geraptiku Talisman": "https://images.neopets.com/items/bd_ger_goldtalisman.gif", "Frozen Wand of Crystals": "https://images.neopets.com/items/bd_wand_crystal.gif", "Molten Branch Sword": "https://images.neopets.com/items/bd_advc2012_branch_swormolten.gif", "Bottle of Wraiths Breath": "https://images.neopets.com/items/pot_bottleofwraithbreath.gif", "Perfectly Flat Rock Shield": "https://images.neopets.com/items/bd_flatrock_shield.gif", "Red Scorchstone": "https://images.neopets.com/items/new_dragonstone_1.gif", "Ice Knuckles": "https://images.neopets.com/items/bd_iceknuckles.gif", "Negg of Everlasting Fire": "https://images.neopets.com/items/bd_fony15_negg_everlasingfire.gif",
    "Bottle of Wraiths Breath": "https://images.neopets.com/items/pot_bottleofwraithbreath.gif", "Elephante Stunray": "https://images.neopets.com/items/bd_ele_stunray.gif", "Dual Battle Mirror": "https://images.neopets.com/items/bd_light_02.gif", "Perfectly Flat Rock Shield": "https://images.neopets.com/items/bd_flatrock_shield.gif", "Omelette Shield": "https://images.neopets.com/items/bd_tyr_omelette_shield.gif", "Molten Branch Sword": "https://images.neopets.com/items/bd_advc2012_branch_swormolten.gif", "Bone Mace": "https://images.neopets.com/items/bd_haunted_bone_mace.gif", "White Linen Tunic": "https://images.neopets.com/items/arm_white_robe.gif", "Bracelet of Kings": "https://images.neopets.com/items/bd_magicbracelet.gif", "Bagguss Bomb": "https://images.neopets.com/items/bd_baggus_bomb.gif", "Uni Gem": "https://images.neopets.com/items/unicorngem.gif", "Acara Gladiator Boots": "https://images.neopets.com/items/bd_acara_boots.gif", "Dark Nova": "https://images.neopets.com/items/darknova.gif", "Balthazar Claw": "https://images.neopets.com/items/balthazar_claw.gif", "Cold Frost": "https://images.neopets.com/items/15c9aafbf9.gif", "Xantan Plushie of Death": "https://images.neopets.com/items/bd_xantan_plushie.gif", "Artichoke Bomb": "https://images.neopets.com/items/artifact_arti_bomb.gif", "Battle Dung": "https://images.neopets.com/items/bd_battle_dung.gif", "Immense Rubber Axe of Doom": "https://images.neopets.com/items/bd_axe_03.gif", "Pteri Egg Wand": "https://images.neopets.com/items/bd_pteri_eggwand.gif", "Pearly Koi Bubble Net": "https://images.neopets.com/items/bd_koi_whip.gif", "Ornate Usul Shield": "https://images.neopets.com/items/bd_usul_shield.gif", "Fungus Chucks": "https://images.neopets.com/items/bd_fungus_chucks.gif", "Superb Golden Helm": "https://images.neopets.com/items/bd_goldenhelm.gif", "Buzz Poison Blaster": "https://images.neopets.com/items/bd_buzz_poison03.gif",

    "Lesser Attack Chive": "https://images.neopets.com/items/bd_chive01.gif",
      "Golden Butter Knife": "https://images.neopets.com/items/bd_goldknife.gif",
      "Wand of the Air Faerie": "https://images.neopets.com/items/artifact_wandofair.gif",
      "Sack Of Sneezing Powder": "https://images.neopets.com/items/bd_kacheek_sneeze_powder.gif",
      "Toxic Sludge Blaster": "https://images.neopets.com/items/bd_zyrolon_3.gif",
      "Petpet Bone": "https://images.neopets.com/items/bfm_petpetbone.gif",
      "Radish Bow": "https://images.neopets.com/items/artifact_radish_bow.gif",
      "Illusens Gems": "https://images.neopets.com/items/bd_illusen_gems.gif",
      "Pumpkin Stick": "https://images.neopets.com/items/bd_pumpkin_stick.gif",
      "Chilli Sword": "https://images.neopets.com/items/bd_scor_chilisword.gif",
      "Maractite Battle Duck": "https://images.neopets.com/items/bd_maractiteduck.gif",
      "Silver Korbat Amulet": "https://images.neopets.com/items/bd_korbat_amulet.gif",
      "Darigan Generals Sword ": "https://images.neopets.com/items/bd_grarrlgeneral_sword.gif",
      "Devious Top Hat and Cane": "https://images.neopets.com/items/bd_tophat_cane.gif",
      "Skarls Sceptre": "https://images.neopets.com/items/bd_skarrl_sceptre.gif",
      "Grimoire of Thade": "https://images.neopets.com/items/eliv_thade_book.gif",
      "Mysterious Amulet": "https://images.neopets.com/items/bd_mysterious_amulet.gif",
      "Commander Blade": "https://images.neopets.com/items/bd_skelsoldier_sword.gif",
      "Florins Flask": "https://images.neopets.com/items/alm_flask_florins.gif",
      "Island Mystics Staff": "https://images.neopets.com/items/bd_mystic_staff.gif",
      "Mynci Helmet": "https://images.neopets.com/items/bd_mynci_phelm.gif",
      "Amulet of the Unblinking Eye": "https://images.neopets.com/items/bd_unblinking_eye_amulet.gif",
      "Frozen Wave Scimitar": "https://images.neopets.com/items/bd_scimitar_frzwave.gif",
      "Tyrannian Army Math Tools": "https://images.neopets.com/items/bd_dd_swissmathtool.gif",
      "Seti Hilt Sword": "https://images.neopets.com/items/bd_seti_sword.gif",
      "Snowflake Pendant": "https://images.neopets.com/items/bd_snowflake_pendant.gif",
      "Greater Orb of the Fire Faerie": "https://images.neopets.com/items/artifact_greatfireorb.gif",
      "Sophies Wooden Spoon": "https://images.neopets.com/items/bd_sophie_spoon.gif",
      "Fighting Folder": "https://images.neopets.com/items/bd_folder.gif",
      "Yooyuball Keepers Chest Guard": "https://images.neopets.com/items/altcp_keeperchestplate.gif",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
      "xxxxx": "xxxxxxx",
    //abilities:
    "Reflect": "https://images.neopets.com/bd2/abilities/0031_3hrei48dgh_reflect/thumb_31.png",
    "Drizzle": "https://images.neopets.com/dome/abilities/0011_gh3efywu3b_drizzle/thumb_11.png",
    "Halitosis": "https://images.neopets.com/bd2/abilities/0010_p1yh839wh5_halitosis/thumb_10.png",
      "Static Cling": "https://images.neopets.com/bd2/abilities/0001_h743ty2wez_staticcling/thumb_1.png",
      "Bandage": "https://images.neopets.com/bd2/abilities/0012_m2u8x3y7w_bandage/thumb_12.png",
      "Meditate": "https://images.neopets.com/bd2/abilities/0013_7y43jzg4er_meditate/thumb_13.png",
      "Shade": "https://images.neopets.com/bd2/abilities/0014_jhuh934z0p_shade/thumb_14.png",
      "Cranky": "https://images.neopets.com/bd2/abilities/0015_q4h98hd2gu_cranky/thumb_15.png",
      "Meh": "https://images.neopets.com/bd2/abilities/0016_4ehr7vwu3i_meh/thumb_16.png",
      "Positive Thinking": "https://images.neopets.com/bd2/abilities/0017_v342uy79hz_thinkpositive/thumb_17.png",
      "An Icicle": "https://images.neopets.com/bd2/abilities/0002_qx4b5ievrb_anicicle/thumb_2.png",
      "Irritable Minions": "https://images.neopets.com/bd2/abilities/0019_i3h7d34uqp_irritableminions/thumb_19.png",
      "Sear": "https://images.neopets.com/bd2/abilities/0018_o3g5y729h8_sear/thumb_18.png",
      "Lens Flare": "https://images.neopets.com/bd2/abilities/0021_c4hje5rwjo_lensflare/thumb_21.png",
      "Shhhhhhhhh...": "https://images.neopets.com/bd2/abilities/0022_u34y72hegr_shhhhhhhhh/thumb_22.png",
      "Throw Pillows": "https://images.neopets.com/bd2/abilities/0020_i43ghu9b8a_throwpillows/thumb_20.png",
      "Burrow": "https://images.neopets.com/bd2/abilities/0025_wy54t93z8u_burrow/thumb_25.png",
      "Float": "https://images.neopets.com/bd2/abilities/0024_bh342iegwu_float/thumb_24.png",
      "Shroud": "https://images.neopets.com/bd2/abilities/0023_yj489reu4j_shroud/thumb_23.png",
      "Snowager's Breath": "https://images.neopets.com/bd2/abilities/0027_e54u9o3rux_snowagersbreath/thumb_27.png",
     "Snowager Breath": "https://images.neopets.com/bd2/abilities/0027_e54u9o3rux_snowagersbreath/thumb_27.png",
      "Tempest": "https://images.neopets.com/bd2/abilities/0026_ot4728gejs_tempest/thumb_26.png",
      "Warlock's Rage": "https://images.neopets.com/bd2/abilities/0028_dy54g2o31z_warlocksrage/thumb_28.png",
      "Drain Life": "https://images.neopets.com/bd2/abilities/0030_d7h34sd92x_drainlife/thumb_30.png",
      "Healing Fire": "https://images.neopets.com/bd2/abilities/0003_c342ieuwds_healingfire/thumb_3.png",
      "Rejuvenate": "https://images.neopets.com/bd2/abilities/0029_ah54yubiow_rejuvenate/thumb_29.png",
    "Rejuvinate": "https://images.neopets.com/bd2/abilities/0029_ah54yubiow_rejuvenate/thumb_29.png",
      "Adrenaline Rush": "https://images.neopets.com/bd2/abilities/0033_yq734ehvrw_adrenalinerush/thumb_33.png",
      "Rally Cry": "https://images.neopets.com/bd2/abilities/0032_yh2u3wqv4b_rallycry/thumb_32.png",
      "Reflect": "https://images.neopets.com/bd2/abilities/0031_3hrei48dgh_reflect/thumb_31.png",
      "Esophagor Stench": "https://images.neopets.com/bd2/abilities/0037_tgyuy43ui0_esophagorstench/thumb_37.png",
      "Meepit Stampede": "https://images.neopets.com/bd2/abilities/0034_syb428iowu_meepitstampede/thumb_34.png",
      "Summon Monoceraptor": "https://images.neopets.com/bd2/abilities/0035_py72ri38gd_summonmonoceraptor/thumb_35.png",

    // you can add more
};















///////////////////////////////////////////////////////////usually you dont have to change anything below/////////////////////////////////////////////////////////////////////

////////////////////////////////////////////multi-healers pic link/////////////////////more multi-healers will be supported in the future////////////////////////////////////////////
var tmt='url("https://images.neopets.com/items/wea_magical_tablet.gif")';
var istaff='url("https://images.neopets.com/items/earth_staff.gif")';
var wodf='url("https://images.neopets.com/items/darkfaerie_wand.gif")';
var blaze='url("https://images.neopets.com/items/wea_tge_scimitar.gif")';
var rodn='url("https://images.neopets.com/items/rod_darknova.gif")';
var rosn='url("https://images.neopets.com/items/wand_supernova.gif")';
////////////////////////////////////////////multi-healers string to display/////////////////////////////////////////////////////////////////
var tmtstr="TMT";
var istaffstr='Istaff';
var wodfstr='WoDF';
var blazestr='Blaze';
var rodnstr='RoDn';
var rosnstr='RoSn';

var currentRound=0;
var onlyonce=0;
var slot1=document.querySelector("#p1e1m > div");
var slot2=document.querySelector("#p1e2m > div");

////////////////////////////// you dont have to change anything below//////////////////
var originalOpponentName;
 // 选择到指定的元素
const element =document.querySelector("#container__2020 > div.battledome-container");

// 创建一个新的 <p> 元素
const newParagraph = document.createElement("p");
//只要不是第一輪,就改變文字
var intervalText=setInterval(function(){
    if(displayPVPInfo&&document.querySelector("#flround")&&!(document.querySelector("#flround").textContent=="1")){
    ////////////////////

if(localStorage.ABCMaxHP1!=null&&localStorage.ABCMaxHP1!=""&&localStorage.ABCMaxHP1!="0"){
// 设置 <p> 元素的文本内容
newParagraph.textContent = "Initial HP:"+localStorage.ABCMaxHP1+"/"+localStorage.ABCMaxHP2+". The Initial HP difference between both sides was "+(localStorage.ABCMaxHP1-localStorage.ABCMaxHP2)+".";
}
// 设置 <p> 元素的文本颜色为红色
newParagraph.style.color = "darkred";
newParagraph.style.fontWeight = "bold";
// 将新的 <p> 元素添加到选择的元素下面
element.appendChild(newParagraph);
///////////////////////////////////////////////////////
for (let i = 1; i <= maxTurns; i++) {
    AddMoreLog(i);
}

    //////////////////////////
  if( document.querySelector("#statusmsg > div")&&localStorage.getItem('ABCLogger')!="Log:") document.querySelector("#statusmsg > div").textContent=localStorage.getItem('ABCLogger');
   if( document.querySelector("#statusmsg > h4")&&localStorage.getItem('ABCLogger')!="Log:") document.querySelector("#statusmsg > h4").textContent=localStorage.getItem('ABCLogger');
    }

},3500);//改变文字
var interva2Text=setInterval(function(){
    if(document.querySelector("#flround")){
        //&&currentRound!=document.querySelector("#flround").textContent
   currentRound= document.querySelector("#flround").textContent;
  if(hideYourName) ChangeYourName();//
if(hideYourOpponentName)ChangeOpponentName();//Change your OpponentName
        AddIcons();//
    }
    ///////history logger
        if(document.querySelector("#flround")&&document.querySelector("#flround").textContent!=1){
        SetLog(document.querySelector("#flround").textContent);}

},recordInterval*1000);//history logger



var intervalId0=setInterval(function(){
 // 1. 获取按钮元素（假设按钮的id为"myButton"）
    var button = document.querySelector("#fight");

    // 2. 检查按钮是否存在
    if (button) {
            // 移除可能存在的旧事件监听器
          // 元素已经加载，清除定时器
      clearInterval(intervalId0);
       // button.removeEventListener('click', handleClick);
        // 3. 绑定点击事件监听器
        button.addEventListener('click', handleClick);

        ///////history logger
        if(document.querySelector("#flround")&&document.querySelector("#flround").textContent!=1){
        SetLog(document.querySelector("#flround").textContent);}

        ///////
    }

    // 自定义点击事件处理函数
    function handleClick() {
        if(onlyonce!=document.querySelector("#flround").textContent){
            onlyonce=document.querySelector("#flround").textContent;
        myCustomMethod();}
    }

    // 自定义方法
    function myCustomMethod() {
         console.log(document.querySelector("#flround").textContent);
        if(document.querySelector("#flround").textContent=="1"){
         ///////////
for (let i = 1; i <= maxTurns; i++) {
    ClearLog(i);
}

            /////////
            localStorage.ABCMaxHP1=document.querySelector("#p1hp").textContent;//储存最大血量数据
            localStorage.ABCMaxHP2=document.querySelector("#p2hp").textContent;//储存最大血量数据
localStorage.setItem('ABCLogger', "Log:");

}
        TestWeapon(slot1,rosn,rosnstr,1200,2);//slotNumber,weaponLink,weaponString,delayInMs,BelowWhat%ofHPItWillHeal(2 if unconditional)
        TestWeapon(slot1,tmt,tmtstr,1200,2);
         TestWeapon(slot1,istaff,istaffstr,1200,0.2);
        TestWeapon(slot1,wodf,wodfstr,1200,0.25);
        TestWeapon(slot1,blaze,blazestr,1200,0.25);
        TestWeapon(slot1,rodn,rodnstr,1200,2);

                        
        ////rosn,rosnstr
            TestWeapon(slot2,rosn,rosnstr, 2200,2);
         TestWeapon(slot2,tmt,tmtstr, 2200,2);
         TestWeapon(slot2,istaff,istaffstr, 2200,0.2);
        TestWeapon(slot2,wodf,wodfstr,2200,0.25);
        TestWeapon(slot2,blaze,blazestr,2200,0.25);
        TestWeapon(slot2,rodn,rodnstr,2200,2);
                        
        // 这里可以写你想要触发的任何自定义代码
    }


},3500);


function TestWeapon(item,identity,str,delayy,percent){

var hpjudge=parseInt(document.getElementById('p1hgreen').style.top, 10)<-456*(1-percent);
//console.log(item,identity,str,hpjudge);//打印送进来的变量
    if(hpjudge&&item&&item.style.backgroundImage==identity)
    {//判断包裹

         setTimeout(function() {
// 获取存储的字符串
let storedString = localStorage.getItem('ABCLogger');

// 如果存储的字符串不存在（即首次使用），可以设置为一个空字符串
if (storedString === null) {
    storedString = '';
}

// 要添加的内容
let newContent = "|"+str;

// 将新内容拼接到原有内容后面
storedString += newContent; // 或者 storedString = storedString + newContent;

// 将更新后的字符串存回 localStorage
localStorage.setItem('ABCLogger', storedString);
   }, delayy);
         }//判断结束

}
//////////////////


function AddMoreLog(number){
if(document.querySelector("#flround")&&document.querySelector("#flround").textContent!=number&&document.getElementById("storage-container"+number)==null&&localStorage.getItem("logContent"+number)!=null&&localStorage.getItem("logContent"+number)!="null"){

  var targetElement = document.querySelector("#logcont");

  // 创建一个新的 div 元素
  var newElement = document.createElement("div");

  // 设置新元素的属性
  newElement.id = "storage-container"+number; // 你可以根据需要修改ID
  newElement.classList.add("storage"); // 你可以添加自定义的CSS类名

  // 设置新元素的内容
  newElement.innerHTML = localStorage.getItem("logContent"+number);

// 设置新元素的样式，确保内容不溢出
 // newElement.style.padding = "20px";
  //newElement.style.marginTop = "20px"; // 可选，控制与上方元素的间距
  newElement.style.backgroundColor = logBackgroundColor; // 可选，背景颜色
  //newElement.style.border = "1px solid #ccc"; // 可选，添加边框
  //newElement.style.maxWidth = "100%"; // 限制最大宽度
  //newElement.style.boxSizing = "border-box"; // 确保 padding 和 border 不影响总宽度

  // 防止内容溢出
  //newElement.style.overflow = "hidden";

  // 将新元素插入到目标元素之后
  targetElement.insertAdjacentElement("afterend", newElement);
}}

function ClearLog(number){
localStorage.setItem(("logContent"+number),null);
}
//document.querySelector("#logcont")
function SetLog(number){

// 1. 获取 #logcont 元素
const logCont = document.querySelector("#logcont");

// 2. 克隆 #logcont 元素，确保原页面不被修改
const clonedLogCont = logCont.cloneNode(true); // true 表示深度克隆（包括所有子节点）

// 3. 删除克隆元素中的 #flcollapse 元素
const flcollapse = clonedLogCont.querySelector("#flcollapse");
if (flcollapse) {
    flcollapse.remove();
}

// 4. 修改克隆元素中的 #logcont > div > p 的 textContent 为 "HP:"
const pElement = clonedLogCont.querySelector("div > p");
if (pElement) {
    pElement.textContent = "HP:"+document.querySelector("#p1hp").textContent+"/"+document.querySelector("#p2hp").textContent;
     // 设置文本颜色为深红色
    pElement.style.color = "darkred";
}
var goodLog=clonedLogCont.querySelector("#log > tbody")!=null;
// 5. 获取修改后的克隆元素的 outerHTML
const logContHTML = clonedLogCont.outerHTML;



// 将 #logcont 元素包裹在一个新的 div 中，应用平移样式
let modifiedHTML = `<div style="transform: translateX(0px);">${logContHTML}</div>`;

if(goodLog)localStorage.setItem(("logContent"+number), modifiedHTML);

}

///////////////////////////




function ChangeOpponentName() {
    // 获取 #log 元素
var logElement = document.querySelector("#logcont");
    // 如果元素存在，执行替换操作
    if (logElement && document.querySelector("#p2name") ) {
        var opponetname = document.querySelector("#p2name").textContent;
        if(opponetname !== opponentName2Disply)originalOpponentName=opponetname;
        //&& document.querySelector("#p2name").textContent !== opponentName2Disply

        // 将 logElement 内的指定字符串全部替换为 "Your Opponent"
        logElement.innerHTML = logElement.innerHTML.replace(new RegExp(originalOpponentName, 'g'), opponentName2Disply);
        document.querySelector("#p2name").textContent = opponentName2Disply;
    }
    //////////////





}
function ChangeYourName() {
    // 如果元素存在，执行替换操作
    if (document.querySelector("#p1name") && document.querySelector("#p1name").textContent !== yourName2Disply) {

var originalYourName = document.querySelector("#p1name").textContent;

         // 获取 #log 元素
var logElement = document.querySelector("#logcont");




        // 将 logElement 内的指定字符串全部替换
        logElement.innerHTML = logElement.innerHTML.replace(new RegExp(originalYourName, 'g'), "You");
 ////////////////////////////////////////
  document.querySelector("#p1name").textContent = yourName2Disply;

    }
}
function AddIcons() {
    
    // 如果元素存在，执行替换操作
    if (document.querySelector("#p1name")) {
//额外加2个
     //   weaponIcons[document.querySelector("#p2name").textContent] = document.querySelector("#p2headshot").style.backgroundImage.slice(5, -2);
     //   weaponIcons[opponentName2Disply] = document.querySelector("#p2headshot").style.backgroundImage.slice(5, -2);
weaponIcons["You "] = document.querySelector("#p1headshot").style.backgroundImage.slice(5, -2);
if(document.querySelector("#p1name").textContent!="You")weaponIcons[document.querySelector("#p1name").textContent] = document.querySelector("#p1headshot").style.backgroundImage.slice(5, -2);
var logElement = document.querySelector("#logcont");
let logHTML = logElement.innerHTML;
if((!logHTML.includes("https://images.neopets.com/items"))&&(!logHTML.includes("https://images.neopets.com/bd2/abili"))){
    console.log(222222222);
for (const [weapon, icon] of Object.entries(weaponIcons)) {
    const regex = new RegExp(`(${weapon})`, 'g');
    logHTML = logHTML.replace(regex, `$1 <img src="${icon}" alt="${weapon} icon" style="width:25px;height:25px;">`);
}

logElement.innerHTML = logHTML;
}
    }
}




//let result = "";
//for (let n = 2; n <= 30; n++) {
//    if(document.querySelector(`#content > table > tbody > tr:nth-child(${n}) > td:nth-child(2) > a > b`)){
  //  let str1 = document.querySelector(`#content > table > tbody > tr:nth-child(${n}) > td:nth-child(2) > a > b`).textContent;
    //let str2 = document.querySelector(`#content > table > tbody > tr:nth-child(${n}) > td:nth-child(1) > a > img`).src;
//    result += `"${str1}": "${str2}", `;}
//}
//console.log(result);
