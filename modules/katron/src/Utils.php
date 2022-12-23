<?php

namespace Drupal\katron;

class Utils {

  /**
   * @param $machine_name
   *
   * @return \Drupal\block_content\Entity\BlockContent|\Drupal\Core\Entity\EntityInterface|null
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public static function getBlockContentByMachineName($machine_name) {
    // Get the block id from machine name.
    $query_result = \Drupal::entityTypeManager()
      ->getStorage('block_content')
      ->getQuery()
      ->condition('machine_name', $machine_name)
      ->range(0, 1)
      ->execute();
    // Get the block id.
    $block_id = reset($query_result);
    if ($block_id) {
      $block = \Drupal\block_content\Entity\BlockContent::load($block_id);
      return $block;
    }
    else {
      return NULL;
    }
  }
}
