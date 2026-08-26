import Planet3D from './Planet3D';

export default function OrbitalScene({ planetKey = 'mercury', compact = false, ...props }) {
  return <Planet3D planetKey={planetKey} compact={compact} {...props} />;
}
