<?php


namespace App;


class Composer extends \Illuminate\Support\Composer
{
    public function run(array $command)
    {
        $command = array_merge($this->findComposer(), $command);
        $this->getProcess($command)->run(function ($type, $data) {
            echo $data;
        }, [
            'COMPOSER_HOME' => '$HOME/.config/composer'
        ]);
    }
}
