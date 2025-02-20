"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Dumbbell, Flame } from 'lucide-react';
import workoutData from './workout-data.json';
interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
}

interface Workout {
  day: string;
  workoutType: string;
  warmup: Exercise[];
  mainExercises: Exercise[];
  accessoryWork: Exercise[];
}

interface WorkoutPlan {
  name: string;
  description: string;
  workouts: Workout[];
}
const WorkoutApp = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { workouts }:WorkoutPlan = workoutData.workoutPlan;

  const getWorkoutTypeColor = (type: string) => {
    if (type.includes('Push')) return 'bg-blue-100 text-blue-800';
    if (type.includes('Pull')) return 'bg-green-100 text-green-800';
    if (type.includes('Legs')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const ExerciseList = ({
    exercises,
    title,
    variant = 'default'
  }: {
    exercises: Exercise[];
    title: string;
    variant?: 'default' | 'warmup'
  }) => (
    <div>
      <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
        {variant === 'warmup' && <Flame className="w-4 h-4 text-orange-500" />}
        {title}
      </h4>
      <div className="space-y-2">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${variant === 'warmup' ? 'bg-orange-50' : 'bg-gray-50'
              }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-800">{exercise.name}</span>
              <span className="text-gray-600 text-sm">
                {exercise.duration ? (
                  exercise.duration
                ) : (
                  `${exercise.sets} x ${exercise.reps}`
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const WorkoutCard = ({ workout }: { workout: Workout }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isSelected = selectedDay === workout.day;
    
    return (
      <div 
        className={`rounded-lg shadow-md p-4 mb-4 transition-all duration-200 cursor-pointer
          ${isSelected ? 'border-2 border-blue-500' : 'border border-gray-200'}
          hover:shadow-lg`}
        onClick={() => setSelectedDay(isSelected ? null : workout.day)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Dumbbell className="w-6 h-6 text-gray-600" />
            <div>
              <h3 className="font-semibold text-lg">{workout.day}</h3>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getWorkoutTypeColor(workout.workoutType)}`}>
                {workout.workoutType}
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-6">
            {workout.warmup && workout.warmup.length > 0 && (
              <ExerciseList 
                exercises={workout.warmup} 
                title="Warm-up" 
                variant="warmup"
              />
            )}
            
            {workout.mainExercises && workout.mainExercises.length > 0 && (
              <ExerciseList 
                exercises={workout.mainExercises} 
                title="Main Exercises" 
              />
            )}
            
            {workout.accessoryWork && workout.accessoryWork.length > 0 && (
              <ExerciseList 
                exercises={workout.accessoryWork} 
                title="Accessory Work" 
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {workoutData.workoutPlan.name}
        </h1>
        <p className="text-gray-600">
          {workoutData.workoutPlan.description}
        </p>
      </div>
      
      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <WorkoutCard key={index} workout={workout} />
        ))}
      </div>
    </div>
  );
};
export default WorkoutApp;