
export const positive_effect_tokens = ["Fortify", "Resist", "Cure", "Restore", "Regenerate", "Invisibility"];

export const essence_ingredients_number = {
  TWO: 0,
  THREE: 1,
  FOUR: 2
}

export const essence_ingridient_multipliers = [
  1.2, 1.4, 1.8
]

export const antidoteAffectedAtributes = [
    {
        name: "least_restore_intelligence",
        affected_attribute_min: 1,
        affected_attribute_max: 5
      },
      {
        name: "lesser_restore_intelligence",
        affected_attribute_min: 6,
        affected_attribute_max: 9
      },
      {
        name: "restore_intelligence",
        affected_attribute_min: 10,
        affected_attribute_max: 13
      },
      {
        name: "greater_restore_intelligence",
        affected_attribute_min: 14,
        affected_attribute_max: 15
      },
      {
        name: "least_restore_hit_points",
        affected_attribute_min: 20,
        affected_attribute_max: 35
      },
      {
        name: "lesser_restore_hit_points",
        affected_attribute_min: 40,
        affected_attribute_max: 50
      },
      {
        name: "restore_hit_points",
        affected_attribute_min: 50,
        affected_attribute_max: 65
      },
      {
        name: "greater_restore_hit_points",
        affected_attribute_min: 65,
        affected_attribute_max: 100 // +65, asumí un máximo de 100
      },
      {
        name: "least_restore_insanity",
        affected_attribute_min: 1,
        affected_attribute_max: 5
      },
      {
        name: "lesser_restore_insanity",
        affected_attribute_min: 6,
        affected_attribute_max: 12
      },
      {
        name: "restore_insanity",
        affected_attribute_min: 13,
        affected_attribute_max: 20
      },
      {
        name: "greater_restore_insanity",
        affected_attribute_min: 21,
        affected_attribute_max: 25
      },
      
    ]
  
  
  const poisonAffectedAtributes = [
    {
        name: "least_damage_intelligence",
        affected_attribute_min: 1,
        affected_attribute_max: 5
      },
      {
        name: "lesser_damage_intelligence",
        affected_attribute_min: 6,
        affected_attribute_max: 9
      },
      {
        name: "damage_intelligence",
        affected_attribute_min: 10,
        affected_attribute_max: 13
      },
      {
        name: "greater_damage_intelligence",
        affected_attribute_min: 14,
        affected_attribute_max: 15
      },
      {
        name: "least_damage_hit_points",
        affected_attribute_min: 20,
        affected_attribute_max: 35
      },
      {
        name: "lesser_damage_hit_points",
        affected_attribute_min: 40,
        affected_attribute_max: 50
      },
      {
        name: "damage_hit_points",
        affected_attribute_min: 50,
        affected_attribute_max: 65
      },
      {
        name: "greater_damage_hit_points",
        affected_attribute_min: 65,
        affected_attribute_max: 100 // +65, asumí un máximo de 100
      },
      {
        name: "least_damage_insanity",
        affected_attribute_min: 1,
        affected_attribute_max: 5
      },
      {
        name: "lesser_damage_insanity",
        affected_attribute_min: 6,
        affected_attribute_max: 12
      },
      {
        name: "damage_insanity",
        affected_attribute_min: 13,
        affected_attribute_max: 20
      },
      {
        name: "greater_damage_insanity",
        affected_attribute_min: 21,
        affected_attribute_max: 25
      }
  ]
